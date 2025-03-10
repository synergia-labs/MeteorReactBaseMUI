import { Meteor } from 'meteor/meteor';
import { IDoc } from '/imports/typings/IDoc';
import { MongoInternals } from 'meteor/mongo';
import { WebApp } from 'meteor/webapp';
import connectRoute from 'connect-route';
import { IContext } from '/imports/typings/IContext';
import { IConnection } from '/imports/typings/IConnection';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';
import { getUserServer } from '/imports/modules/userprofile/api/userProfileServerApi';
import MethodBase from './methods/method.base';
import PublicationBase from './publication/publication.base';

export type EndpointType = 'get' | 'post';
export type ServerActions = 'create' | 'update' | 'delete';
export type MethodType<MethodBase extends { execute: (...args: any) => any }> = (params?: Parameters<MethodBase["execute"]>[0], _context?: IContext) => ReturnType<MethodBase["execute"]>;

class ServerBase {
	apiName: string;
	apiOptions: { apiVersion?: number };

	//region Constructor
	constructor(apiName: string, apiOptions?: { apiVersion?: number }) {
		this.apiName = apiName;
		this.apiOptions = apiOptions || { apiVersion: 1 };

		this.registerMethods = this.registerMethods.bind(this);
		this.registerPublications = this.registerPublications.bind(this);
		this.addRestEndpoint = this.addRestEndpoint.bind(this);

		this._createContext = this._createContext.bind(this);
		this._includeAuditFilds = this._includeAuditFilds.bind(this);
	}
	//endregion

	//region _includeAuditFilds
	protected async _includeAuditFilds(doc: any & Partial<IDoc>, action: ServerActions) {
		const userId = Meteor.userId();
		if (!userId) throw new Meteor.Error('Usuário não autenticado');

		if (action === 'create') {
			doc.createdby = userId;
			doc.createdat = new Date();
			doc.lastupdate = new Date();
			doc.updatedby = userId;
		} else if (action === 'update') {
			doc.lastupdate = new Date();
			doc.updatedby = userId;
		}
	}
	//endregion

	//region registerMethods
	protected async registerMethods<Base extends ServerBase, Param extends unknown[], Return>(
		methodInstances: Array<MethodBase<Base, Param, Return>>,
		classInstance: Base
	) {
		try {
			if (Meteor.isClient) throw new Meteor.Error('500', 'This method can only be called on the server side');
			if (methodInstances?.length == 0 || !!!classInstance) return;

			const methodsObject: Record<string, MethodType<MethodBase<any, any, any>>> = {};
			const self = this;

			methodInstances.forEach(method => {
				method.setServerInstance(classInstance);
				const methodName = method.getName();
				const endpointType = method.getEndpointType();
				const methodFunction = async (...param: [any]) => {
					console.info(`Call Method: ${methodName}`);

					let connection: IConnection;
					// @ts-ignore
					connection = this.connection;
					const meteorContext = await self._createContext(methodName, connection);

					return await method.execute(...param, meteorContext);
				};

				const rawName = methodName.split('.')[1];
				if(!rawName) throw new Meteor.Error('500', 'Nome do método inválido');
				(classInstance as any)[rawName] = methodFunction;

				if (!!endpointType) this.addRestEndpoint(methodName, methodFunction, endpointType);
				methodsObject[methodName] = methodFunction;
			});

			Meteor.methods(methodsObject);
		} catch (error) {
			console.error(`Falha ao registrar os métodos: ${error}`);
			throw error;
		}
	};
	//endregion

	//region registerPublications
	protected registerPublications<Base extends ServerBase, Param extends unknown[], Return>(
		publicationInstances: Array<PublicationBase<Base, Param, Return>>,
		classInstance: Base
	) {
		try {
			if (Meteor.isClient) throw new Meteor.Error('500', 'This method can only be called on the server side');
			if (publicationInstances?.length == 0 || !!!classInstance) return;
			const self = this;

			publicationInstances.forEach(publication => {
				publication.setServerInstance(classInstance);
				const publicationName = publication.getName();

				const publicationFunction = async (...param: any) => {
					console.info(`Call Publication: ${publicationName}`);

					let connection: IConnection
					// @ts-ignore
					connection = this.connection;
					const meteorContext = await this._createContext(publicationName, connection);

					return publication.execute(param, meteorContext);
				};

				const transformedFunction =
					!publication.isTransformedPublication()
						? undefined
						: async (...param: [any]): Promise<any> => {
							let connection: IConnection;
							// @ts-ignore
							connection = this.connection;
							const meteorContext = await self._createContext(publicationName, connection);
							return publication.transformPublication(...param, meteorContext);
						};

				if(!transformedFunction) Meteor.publish(publicationName, publicationFunction);
				else Meteor.publish(publicationName, async function (query, options) {
					const subHandle = await (
						await publicationFunction(query, options)
					)?.observe({
						added: async (document: Return) => {
							this.added(self.apiName, (document as any)._id, await transformedFunction(document));
						},
						changed: async (newDocument: Return) => {
							this.changed(self.apiName, (newDocument as any)._id, await transformedFunction(newDocument));
						},
						removed: (oldDocument: Return) => {
							this.removed(self.apiName, (oldDocument as any)._id);
						}
					});
					this.ready();
					this.onStop(() => {
						subHandle && subHandle.stop();
					});
				});

			});
		} catch (error) {
			console.error(`Falha ao registrar as publicações: ${error}`);
			throw error;
		}
	};
	//endregion

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

	// #region addRestEndpoint
	protected addRestEndpoint(action: string, func: MethodType<MethodBase<any, any, any>>, type: EndpointType) {
		if (Meteor.isServer) {
			const endpoinUrl = `/api/v${this.apiOptions.apiVersion || 1}/${this.apiName}/${action}`;

			const handleFunc = (type: string) => (req: any, res: any) => {
				const endpointContext = {
					urlParams: req.params,
					queryParams: req.query,
					bodyParams: req.body,
					request: req,
					response: res
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
						email: 'api.endpoint@api.com',
						roles: params.role ? [params.role] : []
					},
					session: endpointContext.request,
					headers: req.headers,
					response: endpointContext.response
				};

				try {
					res.writeHead(200, {
						'Content-Type': 'application/json'
					});

					const result: any = func({ params }, _context);

					res.write(typeof result === 'object' ? JSON.stringify(result) : `${result ? result.toString() : '-'}`);
					res.end(); // Must call this immediately before return!
					return;
				} catch (e) {
					console.info(`API ERROR:${this.apiName}|${action} - `, e);
					res.writeHead(403, {
						'Content-Type': 'application/json'
					});
					res.write('Error');
					res.end();
					return;
				}
			};

			if (type) {
				console.info(`CREATE ENDPOINT ${type.toUpperCase()} ${endpoinUrl}`);
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

export default ServerBase;