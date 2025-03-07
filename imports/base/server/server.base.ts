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
export type MethodType<Param, Return> = (params?: Param, _context?: IContext) => Return;
export type MethodTypeAsync<Param, Return> = (params?: Param, _context?: IContext) => Promise<Return>;

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

			const methodsObject: Record<string, MethodTypeAsync<any, any>> = {};
			const self = this;

			methodInstances.forEach((method) => {
				const methodName = method.getName();
				const endpointType = method.getEndpointType();
				const methodFunction = async (...param: [any]) => {
					console.info(`Call Method: ${this.apiName}.${methodName}`);

					let connection: IConnection;
					// @ts-ignore
					connection = this.connection;
					const meteorContext = await self._createContext(methodName, connection);

					return await method.execute(...param, meteorContext);
				};

				method.setServerInstance(classInstance);
				(classInstance as any)[methodName] = methodFunction;

				if (!!endpointType) this.addRestEndpoint(methodName, methodFunction, endpointType);
				methodsObject[`${this.apiName}.${methodName}`] = methodFunction;
			});

			Meteor.methods(methodsObject);
		} catch (error) {
			console.error(`Falha ao registrar os métodos: ${error}`);
			throw error;
		}
	}
	//endregion

	protected registerPublicationsBom<Base extends ServerBase, Param extends unknown[], Return>(
		publicationInstances: Array<PublicationBase<Base, Param, Return>>,
		classInstance: Base
	) {
		try {
			if (Meteor.isClient) throw new Meteor.Error('500', 'This method can only be called on the server side');
			if (publicationInstances?.length == 0 || !!!classInstance) return;
			const self = this;

			publicationInstances.forEach((publication) => {
				const publicationName = publication.getName();

				const publicationFunction = async (...param: [any]) => {
					console.info(`Call Publication: ${this.apiName}.${publicationName}`);

					let connection: IConnection;
					// @ts-ignore
					connection = this.connection;
					const meteorContext = await this._createContext(publicationName, connection);

					return publication.execute(param, meteorContext);
				};

				// const transformedFunction =
				// 	!publication.isTransformedPublication()
				// 		? undefined
				// 		: async (...param: [any]) => publication.transformPublication(...param);

				publication.setServerInstance(classInstance);
				(classInstance as any)[publicationName] = publicationFunction;

				Meteor.publish(`${this.apiName}.${publicationName}`, publicationFunction);
			});
		} catch (error) {
			console.error(`Falha ao registrar as publicações: ${error}`);
			throw error;
		}
	}

	// #region registerPublications
	protected async registerPublications(publications: {
		[action: string]: {
			method: MethodType<any, any>;
			endpointType?: EndpointType;
			enableCountPublication?: boolean;
		};
	}) {
		// Cria o objeto com as publicações diretamente
		const publicationsObject: { [action: string]: MethodType<any, any> } = {};
		const self = this;

		Object.entries(publications).forEach(([action, { method, endpointType, enableCountPublication }]) => {
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

	// #region _createContext
	protected _createContext(
		action: string,
		connection?: IConnection,
		userProfile?: IUserProfile,
		session?: MongoInternals.MongoConnection
	): IContext {
		const user: IUserProfile = userProfile || getUserServer(connection);

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
	addRestEndpoint(action: string, func: MethodType<any, any>, type: EndpointType, baseUrl?: string) {
		if (Meteor.isServer) {
			const endpoinUrl = baseUrl ?? `/api/v${this.apiOptions.apiVersion || 1}/${this.apiName}/${action}`;

			const handleFunc = (req: any, res: any) => {
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

				const _context: IContext = this._createContext(action, endpointContext.connection);

				try {
					res.writeHead(200, {
						'Content-Type': 'application/json'
					});

					const result = func({ params }, _context);

					res.write(typeof result === 'object' ? JSON.stringify(result) : `${result ? result.toString() : '-'}`);
					res.end();
					return;
				} catch (e) {
					console.log(`API ERROR:${this.apiName}|${action} - `, e);
					res.writeHead(403, {
						'Content-Type': 'application/json'
					});
					res.write('Error');
					res.end();
					return;
				}
			};

			if (type) {
				console.log(`CREATE ENDPOINT ${type.toUpperCase()} ${endpoinUrl}`);
				WebApp.connectHandlers.use(
					connectRoute((router: any) => {
						router[type](endpoinUrl, handleFunc);
					})
				);
			}
		}
	}

	// #endregion

	protected _autoRegisterPublications<Base extends ServerBase, Param extends unknown[], Return>(
		publicationInstances: Array<MethodBase<Base, Param, Return>>,
		classInstance: Base
	) {
		// publicationInstances.forEach(publication => {
		// 	console.log('publication', publication);
		// 	publication.setServerInstance(classInstance);
		// 	(classInstance as any)[publication.getName()] = async (...args: Parameters<typeof publication.execute>) =>
		// 		await publication.execute(...args);
		// 	this.registerPublications({
		// 		[publication.getName()]: {
		// 			method: (classInstance as any)[publication.getName()],
		// 			...(!publication.getEndpointType() ? {} : { endpointType: publication.getEndpointType() })
		// 		}
		// 	});
		// });
	}
}

export default ServerBase;
