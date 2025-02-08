import { noAvatarBase64, noImageBase64 } from './noimage';
import { isArray, isObject, merge } from 'lodash';
import { hasValue } from '../libs/hasValue';
import { Mongo, MongoInternals } from 'meteor/mongo';
import { ClientSession, MongoClient } from 'mongodb';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import sharp from 'sharp';
import { countsCollection } from '../api/countCollection';
import { Validador } from '../libs/Validador';
import { segurancaApi } from '../security/api/segurancaApi';
import { WebApp } from 'meteor/webapp';
// @ts-ignore
import bodyParser from 'body-parser';
// @ts-ignore
import cors from 'cors';
// @ts-ignore
import connectRoute from 'connect-route';
import { ISchema } from '../typings/ISchema';
import { IContext } from '../typings/IContext';
import { IDoc } from '../typings/IDoc';
import { IBaseOptions } from '../typings/IBaseOptions';
import { IConnection } from '../typings/IConnection';
import { IUserProfile } from '../modules/userprofile/api/userProfileSch';
import Selector = Mongo.Selector;
import { getUserServer } from '../modules/userprofile/api/userProfileServerApi';

WebApp.connectHandlers.use(cors());
WebApp.connectHandlers.use(bodyParser.json({ limit: '50mb' }));

const getNoImage = (isAvatar = false) => {
	if (!isAvatar) {
		return noImageBase64;
	} else {
		return noAvatarBase64;
	}
};

const defaultOptions = {
	disableDefaultPublications: true
};

interface IMongoOptions<T> extends Mongo.Options<T> {
	projection: any;
}

interface IApiRestImage {
	addRoute: (path: string, handle: any) => void;
	addThumbnailRoute: (path: string, handle: any) => void;
}

interface IApiRestAudio {
	addRoute: (path: string, handle: any) => void;
}

type IPublication = {
	[key: string]: any;
};

type IResponse = {
	[key: string]: any;
};

// region Base Model
export class ServerApiBase<Doc extends IDoc> {
	noImagePath?: string;
	publications: IPublication;
	restApi = {};
	schema: ISchema<Doc>;
	collectionName: string | null;
	counts: Mongo.Collection<any>;
	apiRestImage?: IApiRestImage | undefined;
	apiRestAudio?: IApiRestAudio | undefined;
	auditFields = ['createdby', 'createdat', 'lastupdate', 'updatedby', 'sincronizadoEm', 'idAparelho'];
	defaultResources?: any;
	// @ts-ignore
	collectionInstance: Mongo.Collection<any>;

	/**
	 * Constructor
	 * @param apiName
	 * @param apiSch
	 * @param  {Object} options
	 */
	constructor(apiName: string, apiSch: ISchema<Doc>, options?: IBaseOptions) {
		options = { ...defaultOptions, ...options };

		this.defaultResources = options?.resources;
		this.noImagePath = options?.noImagePath;
		this.collectionName = apiName;
		this.schema = apiSch;
		this.publications = {};
		this.counts = countsCollection;

		this.initCollection = this.initCollection.bind(this);

		//**GETS **
		this.getSchema = this.getSchema.bind(this);
		this.getCollectionInstance = this.getCollectionInstance.bind(this);
		this.countDocuments = this.countDocuments.bind(this);

		//**AUXS METHODS**
		this._addImgPathToFields = this._addImgPathToFields.bind(this);
		this._prepareData = this._prepareData.bind(this);
		this._checkDataBySchema = this._checkDataBySchema.bind(this);
		this._includeAuditData = this._includeAuditData.bind(this);
		this._prepareDocForUpdate = this._prepareDocForUpdate.bind(this);
		this._createContext = this._createContext.bind(this);
		this._executarTransacao = this._executarTransacao.bind(this);

		//**API REST**
		this.addRestEndpoint = this.addRestEndpoint.bind(this);
		this.initApiRest = this.initApiRest.bind(this);
		this.createAPIRESTForAudioFields = this.createAPIRESTForAudioFields.bind(this);
		this.createAPIRESTForIMGFields = this.createAPIRESTForIMGFields.bind(this);
		this.createAPIRESTThumbnailForIMGFields = this.createAPIRESTThumbnailForIMGFields.bind(this);

		//**PUBLICATIONS**
		this.registerPublications = this.registerPublications.bind(this);
		this.addPublication = this.addPublication.bind(this);
		this.addTransformedPublication = this.addTransformedPublication.bind(this);
		this.updatePublication = this.updatePublication.bind(this);
		this.addCompositePublication = this.addCompositePublication.bind(this);

		//**DEFAULT PUBLICATIONS**
		this.defaultCollectionPublication = this.defaultCollectionPublication.bind(this);
		this.defaultCounterCollectionPublication = this.defaultCounterCollectionPublication.bind(this);
		this.defaultListCollectionPublication = this.defaultListCollectionPublication.bind(this);
		this.defaultDetailCollectionPublication = this.defaultDetailCollectionPublication.bind(this);

		//**METHODS**
		this.registerMethod = this.registerMethod.bind(this);
		this.registerTransactionMethod = this.registerTransactionMethod.bind(this);
		this.registerAllMethods = this.registerAllMethods.bind(this);

		//**API/DB METHODS**
		this.serverSync = this.serverSync.bind(this);

		this.serverInsert = this.serverInsert.bind(this);
		this.beforeInsert = this.beforeInsert.bind(this);
		this.afterInsert = this.afterInsert.bind(this);
		this.onInsertError = this.onInsertError.bind(this);

		this.serverUpdate = this.serverUpdate.bind(this);
		this.beforeUpdate = this.beforeUpdate.bind(this);
		this.afterUpdate = this.afterUpdate.bind(this);
		this.onUpdateError = this.onUpdateError.bind(this);

		this.serverRemove = this.serverRemove.bind(this);
		this.beforeRemove = this.beforeRemove.bind(this);
		this.afterRemove = this.afterRemove.bind(this);
		this.onRemoveError = this.onRemoveError.bind(this);

		this.serverUpsert = this.serverUpsert.bind(this);
		this.beforeUpsert = this.beforeUpsert.bind(this);

		this.serverGetDocs = this.serverGetDocs.bind(this);
		this.exportCollection = this.exportCollection.bind(this);

		this.findOne = this.findOne.bind(this);
		this.find = this.find.bind(this);

		this.initCollection(apiName);
		this.initApiRest();
		this.registerPublications(options);
		this.registerAllMethods();
		
		// this.createAPIRESTForAudioFields();
		// this.createAPIRESTForIMGFields();
		// this.createAPIRESTThumbnailForIMGFields(sharp);
	}

	initCollection(apiName: string) {
		this.collectionName = apiName;
		if (this.collectionName !== 'users') {
			// If Is SERVER
			this.collectionInstance = new Mongo.Collection(this.collectionName);
			// Deny all client-side updates on the Lists collection
			this.getCollectionInstance().deny({
				insert() {
					return true;
				},
				update() {
					return true;
				},
				remove() {
					return true;
				}
			});
		} else {
			this.collectionInstance = Meteor.users;
			// Deny all client-side updates on the Lists collection
			this.getCollectionInstance().deny({
				insert() {
					return true;
				},
				update() {
					return true;
				},
				remove() {
					return true;
				}
			});
		}
	}

	//**GETS **
	getSchema = () => {
		return { ...this.schema };
	};

	/**
	 * Get the collection instance.
	 * @returns {Object} - Collection.
	 */
	getCollectionInstance() {
		return this.collectionInstance;
	}

	/**
	 * @returns {String} - Return the number of documents from a collection.
	 */
	async countDocuments() {
		return await this.getCollectionInstance().find().countAsync();
	}

	//**AUXS METHODS**
	_addImgPathToFields = (doc: any) => {
		Object.keys(this.schema).forEach((field) => {
			if (this.schema[field].isImage) {
				if (doc['has' + field]) {
					doc[field] = `${Meteor.absoluteUrl()}thumbnail/${this.collectionName}/${field}/${doc._id}?date=${
						doc.lastupdate && doc.lastupdate.toISOString ? doc.lastupdate.toISOString() : '1'
					}`;
				} else {
					doc[field] = this.noImagePath ? this.noImagePath : `${Meteor.absoluteUrl()}images/noimage.jpg`;
				}
			}
		});
		return doc;
	};

	_prepareData = (_docObj: Partial<Doc>) => {
		const schema = this.schema;
		const schemaKeys = Object.keys(this.schema);
		const newDataObj: any = {};

		Object.keys(_docObj).forEach((key: string) => {
			let isDate: boolean;
			let data: any;

			// @ts-ignore
			data = _docObj[key];
			isDate = data && data instanceof Date && !isNaN(data.valueOf());

			if (schemaKeys.indexOf(key) !== -1) {
				let schemaData: any;
				schemaData = schema[key];
				if (
					schemaData.isImage &&
					(!hasValue(data) || (hasValue(data) && data?.indexOf('data:image') === -1)) &&
					data !== '-'
				) {
					// dont update if not have value field of image
				} else if (schema[key].isImage && data === '-') {
					newDataObj[key] = null;
				} else if (hasValue(data) && schema[key] && schema[key].type === Number) {
					newDataObj[key] = Number(data);
				} else if (schema[key] && schema[key].type === Date && isDate) {
					newDataObj[key] = new Date(data);
				} else if (schema[key] && Array.isArray(schema[key].type) && !Array.isArray(data)) {
					// No Save
				} else if (
					schema[key] &&
					!Array.isArray(schema[key].type) &&
					typeof schema[key].type === 'object' &&
					!hasValue(data)
				) {
					// No Save
				} else if (schema[key] && schema[key].type === String && data === null) {
					// No Save
				} else if (schema[key] && schema[key].type !== Date) {
					newDataObj[key] = data;
				}
			}
		});

		if (_docObj.sincronizadoEm) newDataObj.sincronizadoEm = _docObj.sincronizadoEm;

		return newDataObj;
	};

	/**
	 * Check collections fields.
	 * @param  {Object} _docObj - Document/Object the will be inseted.
	 * @param fieldsNamesIgnoreCheck
	 * @returns {Object} - The checked object for the subschema.
	 */
	_checkDataBySchema = (_docObj: Partial<Doc>, fieldsNamesIgnoreCheck: string[] = []): Partial<Doc> => {
		const schema = this.getSchema();
		const schemaKeys = Object.keys(schema);
		const newDataObj = this._prepareData(_docObj);
		const objForCheck = { ...newDataObj };
		// Don't need to inform every field, but if they was listed
		// or informed, they can't be null.it
		const keysOfDataObj = Object.keys(newDataObj);
		const newSchema: { [key: string]: any } = {};

		// Remove from the Schema the optional fields not present in the DataObj.
		schemaKeys.forEach((field) => {
			if (
				fieldsNamesIgnoreCheck.indexOf(field) !== -1 ||
				(schema[field].visibilityFunction && !schema[field].visibilityFunction!(newDataObj))
			) {
				delete objForCheck[field];
				return;
			} else if (schema[field].visibilityFunction && !schema[field].visibilityFunction!(newDataObj)) {
				delete newDataObj[field];
				delete objForCheck[field];
				return;
			}
			if (schema[field].optional && Array.isArray(objForCheck[field]) && Array.isArray(objForCheck[field][0])) {
				delete objForCheck[field];
			} else if (
				!schema[field].optional &&
				!schema[field].isImage &&
				!schema[field].isAvatar &&
				fieldsNamesIgnoreCheck.indexOf(field) === -1 &&
				!hasValue(newDataObj[field])
			) {
				throw new Meteor.Error('Obrigatoriedade', `O campo "${schema[field].label || field}" é obrigatório`);
			} else if (keysOfDataObj.indexOf(field) !== -1) {
				if (!!schema[field]?.optional) {
					newSchema[field] = Match.OneOf(undefined, null, schema[field].type);
				} else {
					newSchema[field] = schema[field].type;
				}

				// remove string referring to image to improve check function performance
				if (
					(schema[field].isImage || schema[field].isAvatar) &&
					newDataObj[field] &&
					typeof newDataObj[field] === 'string'
				) {
					delete newSchema[field];
					delete objForCheck[field];
				}
			}
		});

		try {
			if (objForCheck.sincronizadoEm) check(objForCheck, { ...newSchema, sincronizadoEm: Date });
			else check(objForCheck, newSchema);
		} catch (e: any) {
			const field = e.path;
			throw new Meteor.Error(
				'Erro de tipagem no schema',
				`Erro de tipagem no schema. Verifique se o campo "${field}" está correto.`
			);
		}

		return newDataObj;
	};

	/**
	 * Check if any updates occurs in
	 * any document by any action.
	 * @param  {Object} doc - Collection document.
	 * @param  {String} action - Action the will be perform.
	 * @param defaultUser
	 */
	async _includeAuditData(doc: Doc | Partial<Doc>, action: string, defaultUser: string = 'Anonymous') {
		const userId = (await getUserServer()) ? await getUserServer()?._id : defaultUser;
		if (action === 'insert') {
			doc.createdby = userId;
			doc.createdat = new Date();
			doc.lastupdate = new Date();
			doc.updatedby = userId;
		} else {
			doc.lastupdate = new Date();
			doc.updatedby = userId;
		}
	}

	_prepareDocForUpdate = (doc: Doc, oldDoc: Doc, nullValues: { [key: string]: string }) => {
		const newDoc: any = {};
		Object.keys(doc).forEach((key: string) => {
			// @ts-ignore
			let docData = doc[key];
			const isDate = docData && docData instanceof Date && !isNaN(docData.valueOf());
			const isBoolean = typeof docData === 'boolean';
			if (!!nullValues && !docData && docData !== 0 && !isBoolean) {
				nullValues[key] = '';
			} else {
				if (
					key !== '_id' &&
					['lastupdate', 'createdat', 'createdby', 'updatedby'].indexOf(key) === -1 &&
					!isDate &&
					isObject(docData) &&
					!isArray(docData) &&
					!!docData &&
					// @ts-ignore
					Object.keys(docData).filter((k: string) => isArray(docData[k])).length === 0
				) {
					// @ts-ignore
					newDoc[key] = merge(oldDoc[key] || {}, docData);
				} else {
					newDoc[key] = docData;
				}
			}
		});

		return newDoc;
	};

	protected async _createContext(
		schema: ISchema<Doc>,
		collection: string,
		action: string,
		connection?: IConnection,
		userProfile?: IUserProfile,
		validadorArg?: Validador,
		session?: MongoInternals.MongoConnection
	): Promise<IContext> {
		const user: IUserProfile = userProfile || (await getUserServer(connection));

		const validador = validadorArg || new Validador(schema);
		return {
			collection,
			action,
			user,
			connection,
			schema,
			validador,
			session
		};
	}

	protected _executarTransacao(asyncRawMongoOperations: (session: ClientSession) => any) {
		const { client } = MongoInternals.defaultRemoteCollectionDriver().mongo;
		const execucaoTransacaoAssincrona = async (client: MongoClient, callback: Function) => {
			let erro = null,
				resultado = null;
			const session = await client.startSession();
			await session.startTransaction();
			try {
				resultado = await asyncRawMongoOperations(session);
				await session.commitTransaction();
			} catch (e: any) {
				await session.abortTransaction();
				console.error('Erro durante transacao', e);
				if (e.name === 'MongoError' && e.codeName == 'WriteConflict') {
					erro = new Meteor.Error('mongo.WriteConflict', 'Não foi possivel realizar a operação. Tente novamente.');
				}
				if (e instanceof Meteor.Error) {
					erro = e;
				} else {
					erro = new Meteor.Error('erroOperacao', e.message || e);
				}
			} finally {
				session.endSession();
			}
			callback(erro, resultado);
		};

		const sincronizarExecucao = Meteor.wrapAsync(execucaoTransacaoAssincrona);

		return sincronizarExecucao(client);
	}

	//**API REST**
	addRestEndpoint(
		route: string,
		func: (params: any, options: any) => any,
		types: string[] = ['get', 'post'],
		apiOptions: {
			apiVersion: number;
			authFunction: (headers: any, params: any) => Boolean;
		} = {
			apiVersion: 1,
			authFunction: () => true
		}
	) {
		if (Meteor.isServer) {
			if (!route || !func || !types || !apiOptions) {
				console.log('CREATE API ERRRO:', this.collectionName, route);
				return;
			}
			const endpoinUrl = `/api/v${apiOptions.apiVersion || 1}/${this.collectionName}/${route}`;

			const handleFunc = (type: string) => (req: any, res: any) => {
				const endpointContext = {
					urlParams: req.params,
					queryParams: req.query,
					bodyParams: req.body,
					request: req,
					response: res
				};

				const params = Object.assign(
					{},
					endpointContext.queryParams || {},
					endpointContext.urlParams || {},
					endpointContext.bodyParams || {}
				);

				const context = {
					type,
					headers: req.headers,
					response: endpointContext.response
				};

				if (apiOptions.authFunction && !apiOptions.authFunction(req.headers, params)) {
					res.writeHead(403, {
						'Content-Type': 'application/json'
					});
					res.write('Access denied');
					res.end();
					return;
				}

				try {
					res.writeHead(200, {
						'Content-Type': 'application/json'
					});

					const result = func(params, context);

					res.write(typeof result === 'object' ? JSON.stringify(result) : `${result ? result.toString() : '-'}`);
					res.end(); // Must call this immediately before return!
					return;
				} catch (e) {
					console.log(`API ERROR:${this.collectionName}|${route} - `, e);
					res.writeHead(403, {
						'Content-Type': 'application/json'
					});
					res.write('Error');
					res.end();
					return;
				}
			};

			if (types) {
				types.forEach((type) => {
					console.log(`CREATE ENDPOINT ${type.toUpperCase()} ${endpoinUrl}`);
					WebApp.connectHandlers.use(
						connectRoute((router: any) => {
							router[type](endpoinUrl, handleFunc(type));
						})
					);
				});
			}
		}
	}

	initApiRest() {
		if (Meteor.isServer) {
			this.apiRestAudio = {
				addRoute: (path: string, handle: any) => {
					console.log('Path', path);
					WebApp.connectHandlers.use(
						connectRoute((router: any) => {
							router.get('/audio/' + path, handle);
						})
					);
				}
			};
			this.apiRestImage = {
				addRoute: (path: string, handle: any) => {
					console.log('Path', path);
					WebApp.connectHandlers.use(
						connectRoute((router: any) => {
							router.get('/img/' + path, handle);
						})
					);
				},
				addThumbnailRoute: (path: string, handle: any) => {
					console.log('Path', path);
					WebApp.connectHandlers.use(
						connectRoute((router: any) => {
							router.get('/thumbnail/' + path, handle);
						})
					);
				}
			};
		}
	}

	createAPIRESTForAudioFields() {
		if (Meteor.isServer) {
			const self = this;
			const schema = self.schema;
			Object.keys(schema).forEach((field) => {
				if (schema[field].isAudio) {
					console.log(
						'CREATE ENDPOINT GET ' + `audio/${this.collectionName}/${field}/:audio ########## IMAGE #############`
					);
					this.apiRestAudio &&
						this.apiRestAudio.addRoute(`${this.collectionName}/${field}/:audio`, async (req: any, res: any) => {
							const { params } = req;

							if (params && !!params.audio) {
								const docID =
									params.audio.indexOf('?') !== -1
										? params.audio.split('?')[0].split('.')[0]
										: params.audio.split('.')[0];
								const doc = await self.getCollectionInstance().findOneAsync({ _id: docID });

								if (doc && !!doc[field] && doc[field] !== '-') {
									if (doc[field].indexOf(';base64,') !== -1) {
										const matches = doc[field].match(/^data:([A-Za-z-+\/]+);base64,([\s\S]+)$/);
										const response: IResponse = {};
										response.type = matches[1];
										response.data = Buffer.from(matches[2], 'base64');
										res.writeHead(200, {
											'Content-Type': response.type,
											'Cache-Control': 'max-age=120, must-revalidate, public',
											'Last-Modified': (new Date(doc.lastupdate) || new Date()).toUTCString()
										});
										res.write(response.data);
										res.end(); // Must call this immediately before return!
										return;
									} else {
										const response: IResponse = {};
										response.type = 'ogg';
										response.data = Buffer.from(doc[field], 'base64');
										res.writeHead(200, {
											'Content-Type': response.type,
											'Cache-Control': 'max-age=120, must-revalidate, public',
											'Last-Modified': (new Date(doc.lastupdate) || new Date()).toUTCString()
										});
										res.write(response.data);
										res.end(); // Must call this immediately before return!
										return;
									}
								}
								res.writeHead(404);
								res.end();
								return;
							}
							res.writeHead(404);
							res.end();
							return;
						});
				}
			});
		}
	}

	createAPIRESTForIMGFields() {
		if (Meteor.isServer) {
			const self = this;
			const schema = self.schema;
			Object.keys(schema).forEach((field) => {
				if (schema[field].isImage) {
					console.log(
						'CREATE ENDPOINT GET ' + `img/${this.collectionName}/${field}/:image ########## IMAGE #############`
					);
					this.apiRestImage &&
						this.apiRestImage.addRoute(`${this.collectionName}/${field}/:image`, async (req: any, res: any) => {
							const { params } = req;

							if (params && !!params.image) {
								const docID =
									params.image.indexOf('.png') !== -1 ? params.image.split('.png')[0] : params.image.split('.jpg')[0];
								const doc = await self.getCollectionInstance().findOneAsync({ _id: docID });

								if (doc && !!doc[field] && doc[field] !== '-') {
									const matches = doc[field].match(/^data:([A-Za-z-+\/]+);base64,([\s\S]+)$/);
									const response: IResponse = {};

									if (!matches || matches.length !== 3) {
										const noimg = getNoImage(schema[field].isAvatar);
										const tempImg = noimg.match(/^data:([A-Za-z-+\/]+);base64,([\s\S]+)$/);
										return Buffer.from(tempImg![2], 'base64');
									}

									response.type = matches[1];
									response.data = Buffer.from(matches[2], 'base64');
									res.writeHead(200, {
										'Content-Type': response.type,
										'Cache-Control': 'max-age=120, must-revalidate, public',
										'Last-Modified': (new Date(doc.lastupdate) || new Date()).toUTCString()
									});
									res.write(response.data);
									res.end(); // Must call this immediately before return!
									return;
								}
								res.writeHead(404);
								res.end();
								return;
							}
							res.writeHead(404);
							res.end();
							return;
						});
				}
			});
		}
	}

	createAPIRESTThumbnailForIMGFields(sharp: any) {
		if (Meteor.isServer) {
			const self = this;
			const schema = self.schema;
			Object.keys(schema).forEach((field) => {
				if (schema[field].isImage) {
					console.log(
						'CREATE ENDPOINT GET ' + `thumbnail/${this.collectionName}/${field}/:image ########## IMAGE #############`
					);
					this.apiRestImage &&
						this.apiRestImage.addThumbnailRoute(
							`${this.collectionName}/${field}/:image`,
							async (req: any, res: any) => {
								const { params, query } = req;

								const widthAndHeight = query.d ? query.d.split('x').map((n: string) => parseInt(n)) : [200, 200];

								if (params && !!params.image) {
									const docID =
										params.image.indexOf('.') !== -1 ? params.image.split('.')[0] : params.image.split('.')[0];
									const doc = await self.getCollectionInstance().findOneAsync({ _id: docID });

									if (doc && !!doc[field] && doc[field] !== '-') {
										const destructImage = doc[field].split(';');
										const imageData = destructImage[1].split(',')[1];

										try {
											let resizedImage = Buffer.from(imageData, 'base64');
											resizedImage = await sharp(resizedImage)
												.rotate()
												.resize({
													fit: 'contain',
													background: {
														r: 255,
														g: 255,
														b: 255,
														alpha: 0.01
													},
													width: !!widthAndHeight[0] ? widthAndHeight[0] : undefined,
													height: !!widthAndHeight[1] ? widthAndHeight[1] : undefined
												})
												.toFormat('webp')
												.toBuffer();

											res.writeHead(200, {
												'Content-Type': 'image/webp',
												'Cache-Control': 'max-age=120, must-revalidate, public',
												'Last-Modified': (new Date(doc.lastupdate) || new Date()).toUTCString()
											});
											res.write(resizedImage);
											res.end(); // Must call this immediately before return!
											return;

											//To Save Base64 IMG
											// return `data:${mimType};base64,${resizedImage.toString("base64")}`
										} catch (error) {
											res.writeHead(200);
											res.end();
											return;
										}
									}
									res.writeHead(404);
									res.end();
									return;
								}
							}
						);
				}
			});
		}
	}

	//**PUBLICATIONS**
	/**
	 * Wrapper to register de default publication.
	 * This is necessary to pass any publication for
	 * every ACL rule, projection rules,
	 * optimization process for the return of the data.
	 * Any Mongo collection options will be set up here.
	 */
	registerPublications(options: IBaseOptions) {
		if (!options.disableDefaultPublications) {
			this.addPublication('default', this.defaultCollectionPublication);
		}
	}

	/**
	 * Wrapper to register a publication of an collection.
	 * @param  {String} publication - Name of the publication.
	 * @param  {Function} newPublicationsFunction - Function the handle the publication of the data
	 */
	addPublication = (publication: string, newPublicationsFunction: any) => {
		const self = this;

		if (Meteor.isServer) {
			Meteor.publish(`${self.collectionName}.${publication}`, newPublicationsFunction);
			self.publications[publication] = newPublicationsFunction;

			Meteor.publish(
				`${self.collectionName}.${'count' + publication}`,
				self.defaultCounterCollectionPublication(self, publication)
			);
			self.publications['count' + publication] = self.defaultCounterCollectionPublication(self, publication);
		} else {
			this.publications[publication] = true;
		}
	};

	addTransformedPublication = (publication: string, newPublicationsFunction: any, transformDocFunc: any) => {
		const self = this;

		if (Meteor.isServer) {
			Meteor.publish(`${self.collectionName}.${publication}`, async function (query, options) {
				const subHandle = await (
					await newPublicationsFunction(query, options)
				)?.observe({
					added: async (document: { _id: string }) => {
						this.added(`${self.collectionName}`, document._id, await transformDocFunc(document));
					},
					changed: async (newDocument: { _id: string }) => {
						this.changed(`${self.collectionName}`, newDocument._id, await transformDocFunc(newDocument));
					},
					removed: (oldDocument: { _id: string }) => {
						this.removed(`${self.collectionName}`, oldDocument._id);
					}
				});
				this.ready();
				this.onStop(() => {
					subHandle && subHandle.stop();
				});
			});

			self.publications[publication] = newPublicationsFunction;

			Meteor.publish(
				`${self.collectionName}.${'count' + publication}`,
				self.defaultCounterCollectionPublication(self, publication)
			);
			self.publications['count' + publication] = self.defaultCounterCollectionPublication(self, publication);
		} else {
			this.publications[publication] = true;
		}
	};

	/**
	 * Wrapper to register a publication of an collection.
	 * @param  {String} publication - Name of the publication.
	 * @param  {Function} newPublicationsFunction - Function the handle the publication of the data
	 */
	updatePublication = (publication: string, newPublicationsFunction: any) => {
		const self = this;

		if (Meteor.isServer) {
			Meteor.publish(`${self.collectionName}.${publication}`, newPublicationsFunction);
			self.publications[publication] = newPublicationsFunction;
		} else {
			this.publications[publication] = true;
		}
	};

	/**
	 * Wrapper to register a publication of an collection.
	 * @param  {String} publication - Name of the publication.
	 * @param  {Function} newPublicationsFunction - Function the handle the publication of the data
	 */
	addCompositePublication = (publication: string, newPublicationsFunction: any) => {
		const self = this;

		if (Meteor.isServer) {
			// @ts-ignore
			Meteor.publishComposite(`${self.collectionName}.${publication}`, newPublicationsFunction);
		}
	};

	//**DEFAULT PUBLICATIONS**
	async defaultCollectionPublication(filter = {}, optionsPub: Partial<IMongoOptions<Doc>>) {
		if (!optionsPub) {
			optionsPub = { limit: 999999, skip: 0 };
		}

		if (optionsPub.skip! < 0) {
			optionsPub.skip = 0;
		}

		if (optionsPub.limit! < 0) {
			optionsPub.limit = 999999;
		}

		if (!optionsPub.projection && !!optionsPub.fields) {
			optionsPub.projection = optionsPub.fields;
		}

		if (!optionsPub.projection) optionsPub.projection = {};
		const hasExceptionProjection = optionsPub && Object.values(optionsPub.projection).find((v) => v === 0 || v === -1);
		const hasRestrictionProjection = optionsPub && Object.values(optionsPub.projection).find((v) => v === 1);

		// Use the default subschema if no one was defined.
		const tempProjection: { [key: string]: number } = { ...(optionsPub.projection || {}) };
		Object.keys(this.schema)
			.concat(['_id'])
			.concat(this.auditFields)
			.forEach((key) => {
				if (
					(hasExceptionProjection && (optionsPub.projection[key] === 0 || optionsPub.projection[key] === -1)) ||
					(hasRestrictionProjection && optionsPub.projection[key] !== 1)
				) {
					delete tempProjection[key];
				} else {
					tempProjection[key] = 1;
				}
			});

		optionsPub.projection = tempProjection;

		const imgFields: { [key: string]: any } = {};

		Object.keys(this.schema).forEach((field) => {
			if (this.schema[field].isImage) {
				imgFields['has' + field] = { $or: '$' + field };
				delete optionsPub.projection[field];
				imgFields[field] = {
					$cond: [
						{ $ifNull: ['$' + field, false] },
						{
							$concat: [
								`${Meteor.absoluteUrl()}img/${this.collectionName}/${field}/`,
								'$_id',
								'?date=',
								{ $toString: '$lastupdate' }
							]
						},
						this.noImagePath
					]
				};
				imgFields[field + 'Thumbnail'] = {
					$cond: [
						{ $ifNull: ['$' + field, false] },
						{
							$concat: [
								`${Meteor.absoluteUrl()}thumbnail/${this.collectionName}/${field}/`,
								'$_id',
								'?date=',
								{ $toString: '$lastupdate' }
							]
						},
						this.noImagePath
					]
				};
			} else if (this.schema[field].isAudio) {
				imgFields['has' + field] = { $or: '$' + field };
				delete optionsPub.projection[field];
				imgFields[field] = {
					$cond: [
						{ $ifNull: ['$' + field, false] },
						{
							$concat: [
								`${Meteor.absoluteUrl()}audio/${this.collectionName}/${field}/`,
								'$_id',
								'?date=',
								{ $toString: '$lastupdate' }
							]
						},
						this.noImagePath
					]
				};
			}
		});

		const queryOptions = {
			fields: { ...optionsPub.projection, ...imgFields },
			limit: optionsPub.limit || 999999999,
			skip: optionsPub.skip || 0,
			sort: {}
		};

		if (optionsPub.sort) {
			queryOptions.sort = optionsPub.sort;
		}

		return this.getCollectionInstance().find({ ...filter }, queryOptions);
	}

	defaultCounterCollectionPublication = (collection: any, publishName: string) =>
		async function (...params: any) {
			// `observeChanges` only returns after the initial `added` callbacks have run.
			// Until then, we don't want to send a lot of `changed` messages—hence
			// tracking the `initializing` state.
			let handlePub = await collection.publications[publishName](...params, { limit: 999999999 });
			if (handlePub) {
				if (Array.isArray(handlePub)) {
					handlePub = handlePub[0];
				}
				let count = 0;
				let loaded = false;

				if (!!handlePub) {
					handlePub.observeChanges(
						{
							added: () => {
								if (loaded) {
									count++;
									// @ts-ignore
									this.changed('counts', `${publishName}Total`, { count });
								}
							},
							removed: () => {
								if (loaded) {
									count--;
									// @ts-ignore
									this.changed('counts', `${publishName}Total`, { count });
								}
							}
						},
						{
							nonMutatingCallbacks: true
						}
					);
					count = handlePub.countAsync(false);
					// @ts-ignore
					this.added('counts', `${publishName}Total`, { count });
					loaded = true;
					// @ts-ignore
					this.ready();
					return;
				} else {
					// @ts-ignore
					this.added('counts', `${publishName}Total`, { count: 0 });
					// @ts-ignore
					this.ready();
					return;
				}
			}
		};

	async defaultListCollectionPublication(filter = {}, optionsPub: Partial<IMongoOptions<Doc>>) {
		const user = await getUserServer();

		if (this.defaultResources && this.defaultResources[`${this.collectionName?.toUpperCase()}_VIEW`]) {
			if (!segurancaApi.podeAcessarRecurso(user, this.defaultResources[`${this.collectionName?.toUpperCase()}_VIEW`])) {
				// throw new Meteor.Error(
				//     `erro.${this.collectionName}Api.permissaoInsuficiente`,
				//     'Você não possui permissão o suficiente para visualizar estes dados!'
				// );
				return this.getCollectionInstance().find({ _id: 'ERROR' });
			}
		}

		const defaultListOptions = { ...(optionsPub || {}) };
		if (!optionsPub || (!optionsPub.limit && optionsPub.limit !== 0)) {
			defaultListOptions.limit = 100;
		}

		return this.defaultCollectionPublication(filter, defaultListOptions);
	}

	async defaultDetailCollectionPublication(filter: Partial<IDoc>, optionsPub: Partial<IMongoOptions<Doc>>) {
		const user = await getUserServer();
		if (this.defaultResources && this.defaultResources[`${this.collectionName?.toUpperCase()}_VIEW`]) {
			if (!segurancaApi.podeAcessarRecurso(user, this.defaultResources[`${this.collectionName?.toUpperCase()}_VIEW`])) {
				// throw new Meteor.Error(
				//     `erro.${this.collectionName}Api.permissaoInsuficiente`,
				//     'Você não possui permissão o suficiente para visualizar estes dados!'
				// );
				return this.getCollectionInstance().find({ _id: 'ERROR' });
			}
		}

		const defaultDetailFilter = { ...(filter || {}) };
		if (!filter || !filter._id) {
			return this.getCollectionInstance().find({ _id: 'ERROR' });
		}
		return this.defaultCollectionPublication(defaultDetailFilter, optionsPub);
	}

	//**METHODS**
	/**
	 * Wrapper to create a Meteor Method.
	 * @param  {String} name - Name of the new Meteor Method.
	 * @param  {Function} func - Function to use in the Meteor Method.
	 */
	registerMethod = (name: string, func: Function) => {
		const self = this;
		const action = name;
		const collection = this.collectionName || '';
		const methodFullName = `${this.collectionName}.${name}`;
		const schema = this.schema;

		const method = {
			async [methodFullName](...param: any[]) {
				console.info('CALL Method:', name, param ? param.length : '-');
				// Prevent unauthorized access

				try {
					let connection: IConnection;
					// @ts-ignore
					connection = this.connection;
					const meteorContext = await self._createContext(schema, collection, action, connection);

					// Here With pass the new Metoer Method with the framework
					// security and the meteor _context.
					const functionResult = func(...param, meteorContext);
					if (action === 'insert') {
						meteorContext.docId = functionResult;
					}
					meteorContext.validador.lancarErroSeHouver();
					return functionResult;
				} catch (error) {
					console.error('Error on CALL Method:', name, 'error:', JSON.stringify(error));
					throw error;
				}
			}
		};
		if (Meteor.isServer) {
			Meteor.methods(method);
		}
	};

	registerTransactionMethod = async (name: string, func: Function) => {
		const self = this;
		const action = name;
		const collection = this.collectionName || '';
		const methodFullName = `${this.collectionName}.${name}`;
		const schema = this.schema;

		const method = {
			async [methodFullName](...param: any[]) {
				const selfMeteor = this;
				console.log('CALL Transaction Method:', name, param ? Object.keys(param) : '-');
				// Prevent unauthorized access

				let connection: IConnection;
				// @ts-ignore
				connection = selfMeteor.connection;

				// @ts-ignore
				await self._executarTransacao(async (session: MongoInternals.MongoConnection) => {
					try {
						const meteorContext = await self._createContext(
							schema,
							collection,
							action,
							connection,
							undefined,
							undefined,
							session
						);

						// Here With pass the new Metoer Method with the framework
						// security and the meteor _context.
						const functionResult = func(...param, meteorContext);

						if (action === 'insert') {
							meteorContext.docId = functionResult;
						}
						meteorContext.validador.lancarErroSeHouver();
						return functionResult;
					} catch (error) {
						throw error;
					}
				});
			}
		};
		if (Meteor.isServer) {
			Meteor.methods(method);
		}
	};

	/**
	 * Register the CRUD methods to use then as
	 * Meteor call.
	 */
	registerAllMethods() {
		this.registerMethod('update', this.serverUpdate);
		this.registerMethod('insert', this.serverInsert);
		this.registerMethod('remove', this.serverRemove);
		this.registerMethod('upsert', this.serverUpsert);
		this.registerMethod('sync', this.serverSync);
		this.registerMethod('countDocuments', this.countDocuments);
		this.registerMethod('getDocs', this.serverGetDocs);
		this.registerMethod('exportCollection', this.exportCollection);
	}

	exportCollection = async () => {
		return await this.getCollectionInstance().find({}).fetchAsync();
	};

	/**
	 * Perform a insert or update on collection.
	 * return {Object} doc inserted or updated
	 * @param _docObj
	 * @param _context
	 */
	async serverSync(_docObj: Doc | Partial<Doc>, _context: IContext) {
		if (!_docObj || !_docObj._id) {
			return false;
		}

		const oldDoc = await this.getCollectionInstance().findOneAsync({ _id: _docObj._id });

		if (
			!(
				((!oldDoc || !oldDoc._id) && (await this.beforeInsert(_docObj, _context))) ||
				(await this.beforeUpdate(_docObj, _context))
			)
		) {
			return false;
		}

		if (!oldDoc || !oldDoc._id) {
			_docObj = this._checkDataBySchema(_docObj, this.auditFields);
			await this._includeAuditData(_docObj, 'insert');
			const insertId = await this.getCollectionInstance().insertAsync(_docObj);
			return { _id: insertId, ..._docObj };
		}
		let docToSave;
		if (!!_docObj.lastupdate && !!oldDoc.lastupdate && new Date(_docObj.lastupdate) > new Date(oldDoc.lastupdate)) {
			docToSave = _docObj;
		} else {
			docToSave = oldDoc;
		}

		docToSave = this._checkDataBySchema(docToSave, this.auditFields);
		await this._includeAuditData(docToSave, 'update');

		await this.getCollectionInstance().updateAsync(_docObj._id, {
			$set: docToSave
		});
		return await this.getCollectionInstance().findOneAsync({ _id: _docObj._id });
	}

	/**
	 * Perform a insert on an collection.
	 * @param  {Object} _docObj - Collection document the will be inserted.
	 * @param  {Object} _context - Meteor this _context.
	 */
	async serverInsert(_docObj: Doc | Partial<Doc>, _context: IContext) {
		try {
			const id = _docObj._id;
			if (await this.beforeInsert(_docObj, _context)) {
				_docObj = this._checkDataBySchema(_docObj as Doc, this.auditFields);
				await this._includeAuditData(_docObj, 'insert');
				if (id) {
					_docObj._id = id;
				}
				const result = await this.getCollectionInstance().insertAsync(_docObj);
				await this.afterInsert(Object.assign({ _id: id || result }, _docObj), _context);
				if (_context.rest) {
					_context.rest.response.statusCode = 201;
				}
				return result;
			}
			return null;
		} catch (insertError: any) {
			this.onInsertError(_docObj, insertError);
			throw insertError;
		}
	}

	/**
	 * Perform an action before allows an document be inserted.
	 * In this case, we have a check ACL for the user and the collection the will be
	 * affected by any updates. So this guarantees the user has to have
	 * access to modify this collection.
	 * Others actions can be executed in here.
	 * @param  {Object} _docObj - Document the will be inserted.
	 * @param  {Object} _context - Meteor this _context.
	 * (If we don't have _context, undefied will be set to this.)
	 * @returns {Boolean} - Returns true for any action.
	 */
	async beforeInsert(_docObj: Doc | Partial<Doc>, _context: IContext) {
		if (this.defaultResources && this.defaultResources[`${this.collectionName?.toUpperCase()}_CREATE`]) {
			segurancaApi.validarAcessoRecursos(_context.user, [`${this.collectionName?.toUpperCase()}_CREATE`]);
		}

		return true;
	}

	/**
	 * Use this as an extension point, to perform any action
	 * after or before action modify a collection/document.
	 * @param  {Object} _docObj - Document the will be changed
	 * @param _context
	 * @returns {Object} - Object updated with the current status.
	 */
	async afterInsert(_docObj: Doc | Partial<Doc>, _context?: IContext) {
		return {
			..._docObj,
			collection: this.collectionName
		};
	}

	onInsertError(_doc: Partial<Doc>, _error: any): void {}

	/**
	 * Perform a insert or update on collection.
	 * @param  {Object} _docObj - Collection document the will be inserted or updated.
	 * @param  {Object} _context - Meteor this _context.
	 */
	async serverUpsert(_docObj: Doc | Partial<Doc>, _context: IContext) {
		const objCollection = await this.getCollectionInstance().findOneAsync({ _id: _docObj._id });
		if (!objCollection) {
			return await this.serverInsert(_docObj, _context);
		}
		return await this.serverUpdate(_docObj, _context);
	}

	/**
	 * Use this as an extension point, to perform any action
	 * after or before action modify a collection/document.
	 * @param  {Object} _docObj - Document the will be changed
	 * @returns {Object} - Object updated with the current status.
	 */
	beforeUpsert(_docObj: Doc | Partial<Doc>) {
		return {
			..._docObj,
			collection: this.collectionName
		};
	}

	/**
	 * Perform a Update on an collection.
	 * @param  {Object} _docObj - Collection document the will be updated.
	 * @param  {Object} _context - Meteor this _context.
	 */
	async serverUpdate(_docObj: Doc | Partial<Doc>, _context: IContext) {
		try {
			check(_docObj._id, String);
			const id = _docObj._id;
			if (await this.beforeUpdate(_docObj, _context)) {
				_docObj = this._checkDataBySchema(_docObj as Doc, this.auditFields);
				await this._includeAuditData(_docObj, 'update');
				const oldData = (await this.getCollectionInstance().findOneAsync({ _id: id })) || {};
				const nullValues = {};

				const preparedData = this._prepareDocForUpdate(_docObj as Doc, oldData, nullValues);
				const action: { [key: string]: any } = {
					$set: preparedData
				};
				if (Object.keys(nullValues).length > 0) {
					action['$unset'] = nullValues;
				}
				const result = await this.getCollectionInstance().updateAsync({ _id: id }, action);
				preparedData._id = id;
				await this.afterUpdate(preparedData, _context);
				return result;
			}
			return null;
		} catch (error) {
			this.onUpdateError(_docObj, error);
			throw error;
		}
	}

	/**
	 * Perform an action before allows an documents be updated.
	 * In this case, we have a check ACL for the user and the collection the will be
	 * affected by any updates. So this guarantees the user has to have
	 * access to modify this collection.
	 * Others actions can be executed in here.
	 * @param _docObj
	 * @param  {Object} _context - Meteor this _context.
	 * (If we don't have _context, undefied will be set to this.)
	 * @returns {Boolean} - Returns true for any action.
	 */
	async beforeUpdate(_docObj: Doc | Partial<Doc>, _context: IContext) {
		if (this.defaultResources && this.defaultResources[`${this.collectionName?.toUpperCase()}_UPDATE`]) {
			segurancaApi.validarAcessoRecursos(_context.user, [`${this.collectionName?.toUpperCase()}_UPDATE`]);
		}
		return true;
	}

	/**
	 * Use this as an extension point, to perform any action
	 * after or before action modify a collection/document.
	 * @param  {Object} _docObj - Document the will be changed
	 * @param _context
	 * @returns {Object} - Object updated with the current status.
	 */
	async afterUpdate(_docObj: Doc, _context: IContext) {
		const document = {
			..._docObj,
			collection: this.collectionName
		};

		const schema = this.getSchema();
		const unsetFields: { [key: string]: string } = {};
		Object.keys(schema).forEach((field) => {
			if (schema[field].visibilityFunction && !schema[field].visibilityFunction!(_docObj)) {
				unsetFields[field] = '';
			}
		});

		if (Object.keys(unsetFields).length > 0) {
			await this.getCollectionInstance().upsertAsync(
				{ _id: _docObj._id },
				{
					$unset: unsetFields
				}
			);
		}
		return document;
	}

	onUpdateError(_doc: Partial<Doc>, _error: any): void {}

	/**
	 * Perform a remove on an collection.
	 * @param  {Object} _docObj - Collection document the will be removed.
	 * @param  {Object} _context - Meteor this _context.
	 */
	async serverRemove(_docObj: Doc | Partial<Doc>, _context: IContext) {
		try {
			if (await this.beforeRemove(_docObj, _context)) {
				const id = _docObj._id;
				check(id, String);
				const result = await this.getCollectionInstance().removeAsync(id);
				await this.afterRemove(_docObj, _context);
				return result;
			}
			return null;
		} catch (error) {
			this.onRemoveError(_docObj, error);
			throw error;
		}
	}

	/**
	 * Perform an action before allows an documents be removed.
	 * In this case, we have a check ACL for the user and the collection the will be
	 * affected by any updates. So this guarantees the user has to have
	 * access to modify this collection.
	 * Others actions can be executed in here.
	 * @param  {Object} _docObj - Documents the will be removed.
	 * @param  {Object} _context - Meteor this _context.
	 * (If we don't have _context, undefied will be set to this.)
	 * @returns {Boolean} - Returns true for any action.
	 */
	async beforeRemove(_docObj: Doc | Partial<Doc>, _context: IContext) {
		if (this.defaultResources && this.defaultResources[`${this.collectionName?.toUpperCase()}_REMOVE`]) {
			segurancaApi.validarAcessoRecursos(_context.user, [`${this.collectionName?.toUpperCase()}_REMOVE`]);
		}
		return true;
	}

	/**
	 * Use this as an extension point, to perform any action
	 * after or before action modify a collection/document.
	 * @param  {Object} _docObj - Document the will be changed
	 * @param _context
	 * @returns {Object} - Object updated with the current status.
	 */
	async afterRemove(_docObj: Doc | Partial<Doc>, _context: IContext) {
		return {
			..._docObj,
			collection: this.collectionName
		};
	}

	onRemoveError(_doc: Partial<Doc>, _error: any): void {}

	/**
	 * Get docs with Meteor.call.
	 * @param  {String} publicationName - Publication Name
	 * @param  {Object} filter - Collection Filter
	 * @param  {Object} optionsPub - Options Publication, like publications.
	 * @returns {Array} - Array of documents.
	 */
	async serverGetDocs(publicationName = 'default', filter = {}, optionsPub: IMongoOptions<Doc>) {
		const result = this.publications[publicationName](filter, optionsPub);
		if (result) {
			return await result.fetchAsync();
		} else {
			return null;
		}
	}

	/**
	 * Wrapper to find items on an collection.
	 * This guarantees the the action will be executed
	 * by a Meteor Mongo Collection of this framework.
	 * @param  {Object} query - Params to query a document.
	 * @param  {Object} projection - Params to define which fiedls will return.
	 */
	find(query: Selector<Doc>, projection = {}) {
		return this.getCollectionInstance().find(query, projection);
	}

	/**
	 * Wrapper to findOne items on an collection.
	 * This guarantees the the action will be executed
	 * by a Meteor Mongo Collection of this framework.
	 * @param  {Object} query - Params to query a document.
	 * @param  {Object} projection - Params to define which fiedls will return.
	 */
	async findOne(query: Selector<Doc> | string = {}, projection = {}): Promise<Partial<Doc>> {
		return await this.getCollectionInstance().findOneAsync(query, projection);
	}
}
