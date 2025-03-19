import { Meteor } from 'meteor/meteor';
import { IDoc } from '/imports/typings/IDoc';
import { MongoInternals } from 'meteor/mongo';
import { WebApp } from 'meteor/webapp';
import connectRoute from 'connect-route';
import { IContext } from '/imports/typings/IContext';
import { IConnection } from '/imports/typings/IConnection';
import MethodBase from './methods/method.base';
import PublicationBase from './publication/publication.base';
import bodyParser from 'body-parser';
import cors from 'cors';
import { EndpointType } from '../types/serverParams';
import { MethodType } from '../types/method';
import EnumUserRoles from '../../modules/userprofile/common/enums/enumUserRoles';
import { getDefaultAdminContext, getDefaultPublicContext } from './utils/defaultContexts';
import { methodSafeInsert } from '../services/security/backend/methods/methodSafeInsert';
import { enumSecurityConfig } from '../services/security/common/enums/config.enum';
import { enumMethodTypes, MethodTypes } from '../services/security/common/enums/methodTypes';

WebApp.connectHandlers.use(cors());
WebApp.connectHandlers.use(bodyParser.json({ limit: '50mb' }));

class ServerBase {
	apiName: string;
	apiOptions: { apiVersion?: number };

	//region Constructor
	constructor(apiName: string, roles?: Array<string>, isProtected?: boolean, apiOptions?: { apiVersion?: number }) {
		this.apiName = apiName;
		this.apiOptions = apiOptions || { apiVersion: 1 };

		this.registerMethods = this.registerMethods.bind(this);
		this.registerPublications = this.registerPublications.bind(this);
		this.addRestEndpoint = this.addRestEndpoint.bind(this);

		this._createContext = this._createContext.bind(this);
		this._registerSecurity(apiName, enumMethodTypes.enum.MODULE, isProtected ?? false, roles);
	}
	//endregion

	private _registerSecurity(name: string, type: MethodTypes, isProtected: boolean, roles?: Array<string>) {
		setTimeout(async () => {
			try {
				const context = getDefaultAdminContext({ apiName: this.apiName, action: 'startApplication' });
				await methodSafeInsert.execute(
					{
						name: name,
						referred: enumSecurityConfig.apiName,
						roles: roles ?? [EnumUserRoles.PUBLIC],
						type: type,
						isProtected: isProtected
					},
					context
				);
			} catch (__) {}
		}, 2000);
	}

	// region getMainUrl
	/**
	 * Método para obter a URL principal da API.
	 * @param sufix 	- Sufixo da URL.
	 * @returns {string} - A URL principal da API.
	 */
	protected getMainUrl(sufix?: string, withPrefix = true): string {
		const baseUrl = `api/v${this.apiOptions.apiVersion || 1}/${this.apiName}/${sufix || ''}`;
		return withPrefix ? Meteor.absoluteUrl(baseUrl) : baseUrl;
	}

	//region registerMethods
	/**
	 * Método para registrar os métodos de uma classe.
	 * @param methodInstances 	- Array de instâncias de métodos.
	 * @param classInstance 	- Instância da classe que contém os métodos.
	 * @param withCall 	- Indica se os métodos devem ser registrados no Meteor para Call.
	 */
	protected async registerMethods<Base extends ServerBase, Param extends unknown[], Return>(
		methodInstances: Array<MethodBase<Base, Param, Return>>,
		classInstance: Base,
		withCall = true
	) {
		try {
			if (Meteor.isClient) throw new Meteor.Error('500', 'This method can only be called on the server side');
			if (methodInstances?.length == 0 || !!!classInstance) return;

			const methodsObject: Record<string, MethodType<MethodBase<any, any, any>>> = {};
			const self = this;

			for (const method of methodInstances) {
				method.setServerInstance(classInstance);
				const methodName = method.getName();
				const endpointType = method.getEndpointType();

				if (withCall)
					this._registerSecurity(methodName, enumMethodTypes.enum.METHOD, method.getIsProtected(), method.getRoles());

				const methodFunction = async (...param: [any]) => {
					console.info(`Call Method: ${methodName}`);

					let connection: IConnection;
					// @ts-ignore
					connection = this.connection;
					const meteorContext = await self._createContext(methodName, connection);

					return await method.execute(...param, meteorContext);
				};

				const rawName = methodName.split('.')[1];
				if (!rawName) throw new Meteor.Error('500', 'Nome do método inválido');
				(classInstance as any)[rawName] = methodFunction;

				if (!!endpointType) this.addRestEndpoint(methodName, methodFunction, endpointType);
				methodsObject[methodName] = methodFunction;
			}

			if (withCall) {
				Meteor.methods(methodsObject);
			}
		} catch (error) {
			console.error(`Falha ao registrar os métodos: ${error}`);
			throw error;
		}
	}
	//endregion

	//region registerPublications
	/**
	 * Método para registrar as publicações de uma classe.
	 * @param publicationInstances 	- Array de instâncias de publicações.
	 * @param classInstance 		- Instância da classe que contém as publicações.
	 */
	protected registerPublications<Base extends ServerBase, Param extends unknown[], Return>(
		publicationInstances: Array<PublicationBase<Base, Param, Return>>,
		classInstance: Base
	) {
		try {
			if (Meteor.isClient) throw new Meteor.Error('500', 'This method can only be called on the server side');
			if (publicationInstances?.length == 0 || !!!classInstance) return;
			const self = this;

			publicationInstances.forEach(async (publication) => {
				publication.setServerInstance(classInstance);
				const publicationName = publication.getName();

				this._registerSecurity(
					publicationName,
					enumMethodTypes.enum.PUBLICATION,
					publication.getIsProtected(),
					publication.getRoles()
				);

				const publicationFunction = async (...param: any) => {
					try{
						console.info(`Call Publication: ${publicationName}`);
	
						let connection: IConnection;
						// @ts-ignore
						connection = this.connection;
						const meteorContext = await this._createContext(publicationName, connection);
	
						return await publication.execute(param, meteorContext);
					}catch(e){
						console.error(`ERRO VINDO DO PUBLICATION: ${e}`);
						//@ts-ignore
						this.error( new Meteor.Error("ERRO VINDO DO PUBLICATION"));
						return;
					}
				};

				const transformedFunction = !publication.isTransformedPublication()
					? undefined
					: async (...param: [any]): Promise<any> => {
							let connection: IConnection;
							// @ts-ignore
							connection = this.connection;
							const meteorContext = await self._createContext(publicationName, connection);
							return publication.transformPublication(...param, meteorContext);
						};

				if (!transformedFunction) Meteor.publish(publicationName, publicationFunction);
				else
					Meteor.publish(publicationName, async function (query, options) {
						try{
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
						}catch(e){
							console.error(`ERRO VINDO DO PUBLICATION T: ${e}`);
							//@ts-ignore
							this.error( new Meteor.Error("ERRO VINDO DO PUBLICATION T"));
						}
					});
			});
		} catch (error) {
			console.error(`Falha ao registrar as publicações: ${error}`);
			throw error;
		}
	}
	//endregion

	// #region _createContext
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
		action: string,
		connection?: IConnection,
		userProfile?: Meteor.User,
		session?: MongoInternals.MongoConnection
	): Promise<IContext> {
		const user =
			userProfile ?? (await Meteor.userAsync()) ?? ({ profile: { roles: [EnumUserRoles.PUBLIC] } } as Meteor.User);
		return { apiName: this.apiName, action, user, connection, session };
	}
	// #endregion

	private _convertToInt(value: any) {
		if (typeof value === 'object') {
			for (const key in value) {
				value[key] = this._convertToInt(value[key]);
			}
		} else if (typeof value === 'string') {
			if (!isNaN(Number(value))) {
				return Number(value);
			}
		}
		return value;
	}

	// #region addRestEndpoint
	/**
	 * Método para adicionar um endpoint REST a uma API.
	 * @param action 	- Ação que será realizada pelo endpoint.
	 * @param func 		- Função que será executada pelo endpoint.
	 * @param type 		- Tipo de requisição que o endpoint aceitará.
	 */
	protected addRestEndpoint(action: string, func: MethodType<MethodBase<any, any, any>>, type: EndpointType) {
		if (Meteor.isServer) {
			const endpoinUrl = this.getMainUrl(action, false);

			const handleFunc = async (req: any, res: any) => {
				const endpointContext = {
					urlParams: req.params,
					queryParams: req.query,
					bodyParams: req.body,
					request: req,
					response: res
				};

				const params = this._convertToInt(
					Object.assign(
						endpointContext.queryParams || {},
						endpointContext.urlParams || {},
						endpointContext.bodyParams || {}
					)
				);

				const _context: IContext = getDefaultPublicContext({
					action,
					request: req,
					response: res,
					apiName: this.apiName,
					session: endpointContext.request
				});

				try {
					const result: any = await func(params, _context);

					if (!res.headersSent && res.writable) {
						res.writeHead(200, {
							'Content-Type': 'application/json'
						});
						res.write(typeof result === 'object' ? JSON.stringify(result) : `${result ? result.toString() : '-'}`);
						res.end(); // Must call this immediately before return!
					}
					return;
				} catch (e) {
					if (!res.headersSent && res.writable) {
						res.writeHead(403, {
							'Content-Type': 'application/json'
						});
						res.end();
					}
					return;
				}
			};

			if (type) {
				console.info(`CREATE ENDPOINT ${type.toUpperCase()} ${endpoinUrl}`);
				WebApp.connectHandlers.use(
					connectRoute((router: any) => {
						router[type](endpoinUrl, handleFunc);
					})
				);
			}
		}
	}
	// #endregion

	// #region addRestEndpoints
	/**
	 * Método para adicionar endpoints REST a uma API.
	 * @param endpoints 	- Array de endpoints [[action, func, ]].
	 */
	protected addRestEndpoints(
		endpoints: Array<[type: string, func: MethodType<MethodBase<any, any, any>>, sufix: string]>
	) {
		endpoints.forEach(([type, func, sufix]) => {
			this.addRestEndpoint(sufix, func, type as EndpointType);
		});
	}
}

export default ServerBase;
