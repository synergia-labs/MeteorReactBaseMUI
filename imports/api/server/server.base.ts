import { Meteor } from "meteor/meteor";
import { IDoc } from "/imports/typings/IDoc";
import { MongoInternals } from "meteor/mongo";
import { WebApp } from "meteor/webapp";

//@ts-ignore
import connectRoute from "connect-route";
import { IContext } from "/imports/typings/IContext";
import { IConnection } from "/imports/typings/IConnection";
import { IUserProfile } from "/imports/modules/userprofile/api/userProfileSch";
import { getUserServer } from "/imports/modules/userprofile/api/userProfileServerApi";

export type ServerActions = "create" | "update" | "delete";
export type EndpointType = "get" | "post";
export type MethodType = (params?: any, _context?: IContext) => any;

export class ServerBase {
	apiName: string;
	apiOptions: { apiVersion?: number };

	// #region Constructor
	constructor(apiName: string, apiOptions?: { apiVersion?: number }) {
		this.apiName = apiName;
		this.apiOptions = apiOptions || { apiVersion: 1 };

		this.registerMethods = this.registerMethods.bind(this);
		this.registerPublications = this.registerPublications.bind(this);

		this._createContext = this._createContext.bind(this);
		this._includeAuditFilds = this._includeAuditFilds.bind(this);
	}
	// #endregion

	// #region _createContext
	protected async _createContext(
		action: string,
		connection?: IConnection,
		userProfile?: IUserProfile,
		session?: MongoInternals.MongoConnection
	): Promise<IContext> {
		const user: IUserProfile = userProfile || (await getUserServer(connection));

		return {
			apiName: this.apiName,
			action,
			user,
			connection,
			session
		};
	}
	// #endregion

	// #region _includeAuditFilds
	async _includeAuditFilds(doc: any & Partial<IDoc>, action: ServerActions) {
		const userId = Meteor.userId();
		if (!userId) throw new Meteor.Error("Usuário não autenticado");

		if (action === "create") {
			doc.createdby = userId;
			doc.createdat = new Date();
			doc.lastupdate = new Date();
			doc.updatedby = userId;
		} else if (action === "update") {
			doc.lastupdate = new Date();
			doc.updatedby = userId;
		}
	}
	// #endregion

	// #region registerMethods
	async registerMethods(methods: { [action: string]: { method: MethodType; endpointType?: EndpointType } }) {
		// Cria o objeto com os métodos diretamente
		const methodsObject: { [action: string]: MethodType } = {};
		const self = this;

		Object.entries(methods).forEach(([action, { method, endpointType }]) => {
			if (endpointType) {
				this.addRestEndpoint(action, method, endpointType);
			}

			methodsObject[`${this.apiName}.${action}`] = async (param: any[]) => {
				console.info(`Call Method: ${this.apiName}.${action}`);

				let connection: IConnection;
				// @ts-ignore
				connection = this.connection;
				const meteorContext = await self._createContext(action, connection);

				const functionResult = method(...param, meteorContext);
				return functionResult;
			};
		});

		// Registra todos os métodos de uma vez só
		Meteor.methods(methodsObject);
	}
	// #endregion

	// #region registerPublications
	async registerPublications(publications: { [action: string]: { method: MethodType; endpointType?: EndpointType } }) {
		// Cria o objeto com as publicações diretamente
		const publicationsObject: { [action: string]: MethodType } = {};
		const self = this;

		Object.entries(publications).forEach(([action, { method, endpointType }]) => {
			if (endpointType) this.addRestEndpoint(action, method, endpointType);

			publicationsObject[`${this.apiName}.${action}`] = async (...args: any[]) => {
				console.info(`Call Publication: ${this.apiName}.${action}`);

				let connection: IConnection;
				// @ts-ignore
				connection = this.connection;
				const meteorContext = await self._createContext(action, connection);

				return method(...args, meteorContext);
			};
		});

		// Registra todas as publicações de uma vez só
		Object.entries(publicationsObject).forEach(([name, publication]) => {
			Meteor.publish(name, publication);
		});
	}
	// #endregion

	// #region addRestEndpoint
	addRestEndpoint(action: string, func: MethodType, type: EndpointType) {
		if (Meteor.isServer) {
			const endpoinUrl = `/api/v${this.apiOptions.apiVersion || 1}/${this.apiName}/${action}`;

			const handleFunc = (type: string) => (req: any, res: any) => {
				const endpointContext = {
					urlParams: req.params,
					queryParams: req.query,
					bodyParams: req.body,
					request: req,
					response: res,
					connection: req.connection // 🔥 AQUI você acessa a conexão do usuário
				};

				const params = Object.assign(
					endpointContext.queryParams || {},
					endpointContext.urlParams || {},
					endpointContext.bodyParams || {}
				);

				const _context: IContext = {
					apiName: this.apiName,
					action,
					user: {
						username: `By ${type} api endpoint`,
						email: "api.endpoint@api.com",
						roles: params.role ? [params.role] : []
					},
					session: endpointContext.request,
					headers: req.headers,
					response: endpointContext.response,
					connection: endpointContext.connection // 🔥 Adicionando conexão no contexto
				};

				try {
					res.writeHead(200, {
						"Content-Type": "application/json"
					});

					const result = func({ params }, _context);

					res.write(typeof result === "object" ? JSON.stringify(result) : `${result ? result.toString() : "-"}`);
					res.end();
					return;
				} catch (e) {
					console.log(`API ERROR:${this.apiName}|${action} - `, e);
					res.writeHead(403, {
						"Content-Type": "application/json"
					});
					res.write("Error");
					res.end();
					return;
				}
			};

			if (type) {
				console.log(`CREATE ENDPOINT ${type.toUpperCase()} ${endpoinUrl}`);
				WebApp.connectHandlers.use(
					connectRoute((router: any) => {
						router[type](endpoinUrl, handleFunc(type));
					})
				);
			}
		}
	}

	// #endregion
}
