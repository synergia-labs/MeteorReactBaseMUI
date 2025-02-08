import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { countsCollection } from '../api/countCollection';
import { IBaseOptions } from '../typings/IBaseOptions';
import { ISchema } from '../typings/ISchema';
import { IMeteorError } from '../typings/IMeteorError';
import { IDoc } from '../typings/IDoc';
import Selector = Mongo.Selector;

const defaultOptions = {
	disableDefaultPublications: true
};

type IPublication = {
	[key: string]: any;
};

// region Base Model
export class ApiBase<Doc extends IDoc> {
	noImagePath?: string;
	publications: IPublication;
	restApi = {};
	schema: ISchema<Doc>;
	collectionName: string | null;
	// @ts-ignore
	collectionInstance: Mongo.Collection<any>;
	counts: Mongo.Collection<any>;
	options: IBaseOptions;

	/**
	 * Constructor
	 * @param apiName
	 * @param apiSch
	 * @param  {Object} options
	 */
	constructor(apiName: string, apiSch: ISchema<Doc>, options?: IBaseOptions | undefined) {
		this.options = {
			...defaultOptions,
			...(options || {})
		};
		this.noImagePath = this.options.noImagePath;
		this.collectionName = apiName;
		this.schema = apiSch;
		this.counts = countsCollection;
		this.publications = {};

		this.initCollection = this.initCollection.bind(this);

		//**GETS **
		this.getSchema = this.getSchema.bind(this);
		this.getCollectionInstance = this.getCollectionInstance.bind(this);
		this.countDocuments = this.countDocuments.bind(this);

		//**AUXS METHODS**
		this._addImgPathToFields = this._addImgPathToFields.bind(this);

		//**API/DB METHODS**
		this.callMethod = this.callMethod.bind(this);
		this.callMethodWithPromise = this.callMethodWithPromise.bind(this);
		this.insert = this.insert.bind(this);
		this.update = this.update.bind(this);
		this.upsert = this.upsert.bind(this);
		this.remove = this.remove.bind(this);
		this.sync = this.sync.bind(this);
		this.getDocs = this.getDocs.bind(this);

		this.find = this.find.bind(this);
		this.findOne = this.findOne.bind(this);
		this.subscribe = this.subscribe.bind(this);

		this.initCollection(apiName);

		if (Meteor.isDevelopment) {
			// Put model on Window variable
			if (window) {
				// @ts-ignore
				if (!window.$app) {
					// @ts-ignore
					window.$app = {};
				}
				// @ts-ignore
				if (!window.$app.api) {
					// @ts-ignore
					window.$app.api = {};
				}

				// @ts-ignore
				window.$app.api[this.collectionName] = this;
			}
			// ####################################
		}
	}

	initCollection(apiName: string) {
		this.collectionName = apiName;
		if (this.collectionName !== 'users') {
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

	getSchema = () => {
		return { ...this.schema };
	};

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

	//**GETS **
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
	countDocuments() {
		return this.getCollectionInstance().find().count();
	}

	//**API/DB METHODS**

	/**
	 * Wrapper to the Meteor call. This check if the user has
	 * connection with the server, in this way we can return the result from
	 * a cached collection or from the server.
	 * @param  {String} name - Meteor method name
	 * @param params
	 */
	callMethod(name: string, ...params: any[]) {
		if (Meteor.status().connected) {
			Meteor.call(`${this.collectionName}.${name}`, ...params);
		} else {
			console.error('Sem Conexão com o Servidor');
		}
	}

	callMethodWithPromise(name: string, ...params: any[]): Promise<any> {
		return new Promise((resolve, reject) =>
			this.callMethod(name, ...params, (e: Error, r: any) => {
				if (e) {
					reject(e);
				} else {
					resolve(r);
				}
			})
		);
	}

	/**
	 * Wrapper for a Meteor call.
	 * @param  {Object} docObj - Document from a collection.
	 * @param  {Function} callback - Callback Function
	 */
	insert(docObj: any, callback: any) {
		const newObj: { [key: string]: any } = { _id: docObj._id };
		const schema = this.getSchema();
		Object.keys(docObj).forEach((key) => {
			if (
				!!schema[key] &&
				((!schema[key].isImage && !schema[key].isAvatar) ||
					(docObj[key] && docObj[key].indexOf('/img/') === -1 && docObj[key].indexOf('/thumbnail/') === -1))
			) {
				newObj[key] = docObj[key];
			}
		});
		this.callMethod('insert', newObj, callback);
	}

	/**
	 * Wrapper for a Meteor call.
	 * @param  {Object} docObj - Document from a collection.
	 * @param  {Function} callback - Callback Function
	 */
	update(
		docObj: any,
		callback = (e: IMeteorError, r: any) => {
			console.log(e, r);
		}
	) {
		const newObj: { [key: string]: any } = { _id: docObj._id };
		const schema = this.schema;
		Object.keys(docObj).forEach((key) => {
			if (
				(!!schema[key] || schema[key] === null) &&
				((!schema[key].isImage && !schema[key].isAvatar) ||
					(typeof docObj[key] === 'string' &&
						docObj[key].indexOf('/img/') === -1 &&
						docObj[key].indexOf('/thumbnail/') === -1))
			) {
				newObj[key] = docObj[key];
			}
		});

		return this.callMethod('update', newObj, callback);
	}

	/**
	 * Wrapper for a Meteor call.
	 * @param  {Object} docObj - Document from a collection.
	 * @param  {Function} callback - Callback Function
	 */
	upsert(docObj: Doc | Partial<Doc>, callback: any) {
		if (!docObj._id) {
			return this.insert(docObj, callback);
		}
		return this.update(docObj, callback);
	}

	/**
	 * Wrapper for a Meteor call.
	 * @param  {Object} docObj - Document from a collection.
	 * @param  {Function} callback - Callback Function
	 */
	remove(
		docObj: object,
		callback = (e: IMeteorError, r: any) => {
			console.log(e, r);
		}
	) {
		this.callMethod('remove', docObj, callback);
	}

	/**
	 * Get Docs
	 * @param apiName
	 * @param filter
	 * @param optionsPub
	 * @param  {Function} callback - Callback Function
	 */
	getDocs(
		apiName = 'default',
		filter = {},
		optionsPub = {},
		callback = (e: IMeteorError, r: any) => {
			console.log(e, r);
		}
	) {
		this.callMethod('getDocs', apiName, filter, optionsPub, callback);
	}

	/**
	 * Sync one object.
	 * @param  {Object} docObj - Document from a collection.
	 * @param  {Function} callback - Callback Function
	 */
	sync(
		docObj: Doc | Partial<Doc>,
		callback = (e: IMeteorError, r: any) => {
			console.log(e, r);
		}
	) {
		this.callMethod('sync', docObj, callback);
	}

	/**
	 * Wrapper to find items on an collection.
	 * This guarantees the the action will be executed
	 * by a Meteor Mongo Collection of this framework.
	 * @param  {Object} query - Params to query a document.
	 * @param  {Object} projection - Params to define which fields will return.
	 */
	find(query: Selector<Doc>, projection = {}) {
		return this.getCollectionInstance().find(query, projection);
	}

	/**
	 * Wrapper to findOne items on an collection.
	 * This guarantees the the action will be executed
	 * by a Meteor Mongo Collection of this framework.
	 * @param  {Object} query - Params to query a document.
	 * @param  {Object} projection - Params to define which fields will return.
	 */
	findOne(query: Selector<Doc> | string = {}, projection = {}): Partial<Doc> {
		return this.getCollectionInstance().findOne(query, projection);
	}

	/**
	 * Make a subscribe for a collection.
	 * @param  {} api='default'
	 * @param param
	 */
	subscribe(
		api = 'default',
		...param: any[]
	): {
		total: number;
		stop(): void;
		ready: () => boolean;
	} | null {
		const self = this;
		if (Meteor.isClient) {
			const subsHandle = Meteor.subscribe(`${this.collectionName}.${api}`, ...param);

			const subHandleCounter = Meteor.subscribe(`${this.collectionName}.count${api}`, param[0] || {});
			const countResult = subHandleCounter.ready() ? self.counts.findOne({ _id: api + 'Total' }) : null;
			const count = countResult ? countResult.count : 0;

			if (subHandleCounter && subHandleCounter.ready) {
				return {
					...subsHandle,
					total: subHandleCounter.ready() ? count : 0,
					ready: () => subsHandle.ready() && subHandleCounter.ready()
				};
			}

			return { ...subsHandle, total: 0 };
		}
		return null;
	}
}
