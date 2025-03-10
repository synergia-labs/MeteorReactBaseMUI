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
	/**
	 * Método para incluir os campos de auditoria em um documento.
	 * @param doc 		- Documento que receberá os campos de auditoria.
	 * @param action 	- Ação que está sendo realizada. (create, update)
	 * 
	 * @returns 		- A alteração do documento ocorre por referência, ou seja, o documento do parâmetro é alterado.
	*/
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
	/**
	 * Método para registrar os métodos de uma classe.
	 * @param methodInstances 	- Array de instâncias de métodos.
	 * @param classInstance 	- Instância da classe que contém os métodos.
	*/
	protected async registerMethods<Base extends ServerBase, Param extends unknown[], Return>(
		methodInstances: Array<MethodBase<Base, Param, Return>>,
		classInstance: Base
	) {
		try {
			if (Meteor.isClient) throw new Meteor.Error('500', 'This method can only be called on the server side');
			if (methodInstances?.length == 0 || !!!classInstance) return;

			const methodsObject: Record<string, MethodType<MethodBase<any, any, any>>> = {};
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

<<<<<<< HEAD
				method.setServerInstance(classInstance);
				(classInstance as any)[methodName] = methodFunction;
=======
				const rawName = methodName.split('.')[1];
				if(!rawName) throw new Meteor.Error('500', 'Nome do método inválido');
				(classInstance as any)[rawName] = methodFunction;
>>>>>>> Gustavo

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

<<<<<<< HEAD
	protected registerPublicationsBom<Base extends ServerBase, Param extends unknown[], Return>(
=======
	//region registerPublications
	/**
	 * Método para registrar as publicações de uma classe.
	 * @param publicationInstances 	- Array de instâncias de publicações.
	 * @param classInstance 		- Instância da classe que contém as publicações.
	*/
	protected registerPublications<Base extends ServerBase, Param extends unknown[], Return>(
>>>>>>> Gustavo
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
<<<<<<< HEAD
	protected _createContext(
=======
	/**
	 * Método para criar o contexto de execução de um método ou publicação.
	 * @param action 		- Ação que está sendo realizada.
	 * @param connection 	- Conexão com o banco de dados.
	 * @param userProfile 	- Perfil do usuário que está realizando a ação.
	 * @param session 		- Sessão do usuário.
	 * 
	 * @returns {IContext}	- O contexto de execução.
	*/
	protected async _createContext(
>>>>>>> Gustavo
		action: string,
		connection?: IConnection,
		userProfile?: IUserProfile,
		session?: MongoInternals.MongoConnection
<<<<<<< HEAD
	): IContext {
		const user: IUserProfile = userProfile || getUserServer(connection);

		return {
			apiName: this.apiName,
			action,
			user,
			connection,
			session
		};
=======
	): Promise<IContext> {
		const user: IUserProfile = userProfile || (await getUserServer(connection));
		return { apiName: this.apiName, action, user, connection, session};
>>>>>>> Gustavo
	}
	// #endregion

	// #region addRestEndpoint
<<<<<<< HEAD
	addRestEndpoint(action: string, func: MethodType<any, any>, type: EndpointType, baseUrl?: string) {
=======
	/**
	 * Método para adicionar um endpoint REST a uma API.
	 * @param action 	- Ação que será realizada pelo endpoint.
	 * @param func 		- Função que será executada pelo endpoint.
	 * @param type 		- Tipo de requisição que o endpoint aceitará.
	*/
	protected addRestEndpoint(action: string, func: MethodType<MethodBase<any, any, any>>, type: EndpointType) {
>>>>>>> Gustavo
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

					const result: any = func({ params }, _context);

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
