import { createStore, del, get, keys, set } from 'idb-keyval';
import { parse, stringify } from 'zipson';
import { ReactiveVar } from 'meteor/reactive-var';
import { _ } from 'lodash';

import settings from '../../settings.json';
import { ApiBase } from './base';

class PersistentMinimongoStorage {
	constructor(collectionName, collectionInstance) {
		const self = this;
		self.collectionName = collectionName;
		self.customStore = new createStore(`${settings.name}_${collectionName}`, `${collectionName}-store`);
		self.controlStore = new createStore(`${settings.name}_${collectionName}_Control`, `${collectionName}-control`);
		self.collection = collectionInstance;

		self.inited = new ReactiveVar(false);
		self.cachedCollection = new Meteor.Collection(null);

		self.cachedCollection.insert_ = self.cachedCollection.insert;
		delete self.cachedCollection.insert;
		self.cachedCollection.insert = (doc, callback = () => {}, updateFromSync = false) => {
			if (!doc || Object.keys(doc).length === 0) {
				return;
			}
			try {
				const id = self.cachedCollection.insert_(doc);
				doc._id = id;
				if (self.list.indexOf(doc._id) === -1) {
					self.list.push(doc._id);
				}
				set(doc._id, stringify(doc), self.customStore);
				if (!updateFromSync) {
					doc.lastupdate = new Date();
					self.addUpdatedDocsIntoControlStoreData(doc);
				}

				callback(null, id);
			} catch (e) {
				callback(e, null);
			}
		};

		self.cachedCollection.update_ = self.cachedCollection.update;
		delete self.cachedCollection.update;
		self.cachedCollection.update = (selector, modifier, options, callback = () => {}, updateFromSync = false) => {
			if (!modifier || Object.keys(modifier).length === 0) {
				return;
			}
			try {
				self.cachedCollection.update_(selector, modifier, {
					...options,
					upsert: true
				});
				const newDoc = self.cachedCollection.findOne(selector);
				set(newDoc._id, stringify(newDoc), self.customStore);
				if (!updateFromSync) {
					newDoc.lastupdate = new Date();
					self.addUpdatedDocsIntoControlStoreData(newDoc);
				}
				callback(null, { ...selector, ...newDoc });
			} catch (e) {
				console.log('Error:', e);
				callback(e, null);
			}
		};

		self.cachedCollection.remove_ = self.cachedCollection.remove;
		delete self.cachedCollection.remove;
		self.cachedCollection.remove = (doc, callback = () => {}, removeFromSync = false) => {
			if (!doc || Object.keys(doc).length === 0) {
				return;
			}
			try {
				self.cachedCollection.remove_(doc._id);
				if (!doc.removeOnly) {
					self.list = self.list.filter((key) => key !== doc._id);
					del(doc._id, self.customStore);
					self.delUpdatedDocsIntoControlStoreData(doc);
					if (!removeFromSync) {
						self.addRemovedDocIntoControlStoreData(doc);
					}
				}
				callback(null, true);
			} catch (e) {
				callback(e, null);
			}
		};

		self.cachedCollection.clear = () => {
			if (self.list.length > 0) {
				self.list.forEach((key) => {
					del(key, self.customStore).then((result) => {
						self.cachedCollection.remove_(key);
					});
				});
			}
			self.list = [];
		};

		self.stats = { added: 0, removed: 0, changed: 0 };
		self.list = [];
		self.updateKeys();
		// Meteor.startup(function () {

		self.initObserver();

		self.initControlStore();
	}

	initObserver = () => {
		if (!Meteor.isClient) {
			return;
		}

		const self = this;

		if (self.collection) {
			self.collection.find({}).observe({
				added(doc) {
					// add document id to tracking list and store
					if (!_.includes(self.list, doc._id)) {
						self.list.push(doc._id);
						set(doc._id, stringify(doc), self.customStore);
					}

					self.cachedCollection.update({ _id: doc._id }, { $set: doc }, { upsert: true }, undefined, true);
					++self.stats.added;
				},

				removed(doc, ...params) {
					// if not in list, nothing to do
					// if(!_.includes(self.list, doc._id)) {
					//     return;
					// }
					// del(doc._id,self.customStore);
					// self.list = self.list.filter(key=>key!==doc._id);
					self.cachedCollection.remove({ _id: doc._id, removeOnly: true });
					++self.stats.removed;
				},

				changed(newDoc, oldDoc) {
					const doc = _.merge(oldDoc, newDoc);
					// update document in local storage
					if (_.includes(self.list, doc._id)) {
						set(doc._id, stringify(doc), self.customStore);
					} else {
						self.list.push(doc._id);
						set(doc._id, stringify(doc), self.customStore);
					}
					self.cachedCollection.update({ _id: doc._id }, { $set: doc }, { upsert: true }, undefined, true);
					++self.stats.changed;
				}
			});
		}
	};

	updateDateOnJson = (object) => {
		function reviver(key, value) {
			if (`${value}`.length === 24 && !!Date.parse(value)) {
				return new Date(value);
			}
			return value;
		}

		return JSON.parse(JSON.stringify(object), reviver);
	};

	initControlStore = (callback = () => {}) => {
		const self = this;
		if (self.controlStoreData) {
			return self.controlStoreData;
		}
		get('config', self.controlStore).then((resultString) => {
			const result = self.updateDateOnJson(resultString ? parse(resultString) : {});

			self.controlStoreData = {
				removedDocs: [],
				updatedDocs: [],
				syncHistory: [],
				lastClientSync: new Date(),
				...(result || {})
			};
			callback(null, {
				removedDocs: [],
				updatedDocs: [],
				syncHistory: [],
				lastClientSync: new Date(),
				...(result || {})
			});
		});
	};

	getControlStoreData = () =>
		this.controlStoreData || {
			removedDocs: [],
			updatedDocs: [],
			syncHistory: [],
			lastClientSync: new Date()
		};

	updateControlStoreData = (newData) => {
		const self = this;
		const newControlStoreDate = {
			...(this.controlStoreData || {}),
			...(newData || {})
		};
		set('config', stringify(newControlStoreDate), self.controlStore);
		this.controlStoreData = newControlStoreDate;
		return newControlStoreDate;
	};

	addUpdatedDocsIntoControlStoreData = (doc, historyItem) => {
		const self = this;
		const controlStore = self.getControlStoreData();
		if (!controlStore.updatedDocs) {
			controlStore.updatedDocs = [doc];
			if (historyItem) {
				controlStore.syncnavigate(historyItem);
			}
			self.updateControlStoreData(controlStore);
			return true;
		}
		controlStore.updatedDocs = controlStore.updatedDocs.filter((d) => d._id !== doc._id);
		controlStore.updatedDocs.push(doc);
		if (historyItem) {
			controlStore.syncnavigate(historyItem);
		}

		self.updateControlStoreData(controlStore);
		return true;
	};

	delUpdatedDocsIntoControlStoreData = (doc, historyItem) => {
		const self = this;
		const controlStore = self.getControlStoreData();
		if (!controlStore.updatedDocs) {
			return false;
		}
		controlStore.updatedDocs = controlStore.updatedDocs.filter((d) => d._id !== doc._id);
		if (historyItem) {
			controlStore.syncnavigate(historyItem);
		}
		self.updateControlStoreData(controlStore);
		return true;
	};

	addRemovedDocIntoControlStoreData = (doc, historyItem) => {
		const self = this;
		const controlStore = self.getControlStoreData();
		if (!controlStore.removedDocs) {
			controlStore.removedDocs = [doc._id];
		} else {
			controlStore.removedDocs.push(doc._id);
		}
		if (historyItem) {
			controlStore.syncnavigate(historyItem);
		}
		self.updateControlStoreData(controlStore);
		return true;
	};
	delRemovedDocIntoControlStoreData = (doc, historyItem) => {
		const self = this;
		const controlStore = self.getControlStoreData();
		if (!controlStore.removedDocs) {
			return false;
		}
		controlStore.removedDocs = controlStore.removedDocs.filter((d) => d !== doc._id);
		if (historyItem) {
			controlStore.syncnavigate(historyItem);
		}
		self.updateControlStoreData(controlStore);
		return true;
	};

	updateSyncHistory = (historyItem) => {
		const self = this;
		const controlStore = self.getControlStoreData();
		if (historyItem) {
			controlStore.syncnavigate(historyItem);
		}
		self.updateControlStoreData(controlStore);
		return true;
	};

	needSync = () => {
		const self = this;
		const controlStore = self.getControlStoreData();
		if (!controlStore) {
			return false;
		}
		return (
			(!!controlStore.removedDocs && controlStore.removedDocs.length > 0) ||
			(!!controlStore.updatedDocs && controlStore.updatedDocs.length > 0) ||
			!controlStore.lastClientSync ||
			(new Date().getTime() - controlStore.lastClientSync.getTime()) / (1000 * 3600 * 24) > 15
		); // greater than 15 days
	};

	initCachedMinimongo = (callback) => {
		const self = this;

		const seconds = self.lastCallInit ? (new Date().getTime() - self.lastCallInit.getTime()) / 1000 : 61;

		if (seconds > 60 && (!!callback || !this.inited.get())) {
			this.updateKeys((e, r) => {
				if (r) {
					self.cachedCollection.remove_({});
					self.list.forEach(async (key, i) => {
						const res = await get(key, self.customStore).then((result) => {
							const docR = parse(result);
							const doc = self.updateDateOnJson(docR);
							self.cachedCollection.update_({ _id: doc._id }, { $set: doc }, { upsert: true });
						});
					});
					self.inited.set(true);
					if (callback) {
						callback(null, true);
					}
				} else {
					if (callback) {
						callback(e, null);
					}
					console.log('Error:', self.collectionName, ':', e);
				}
			});
		}

		self.lastCallInit = new Date();
		return this.inited;
	};

	updateKeys = (
		callback = (e) => {
			if (e) {
			}
		}
	) => {
		const self = this;
		keys(self.customStore)
			.then((keys) => {
				self.list = keys;
				callback(null, true);
			})
			.catch((err) => callback(err, null));
	};

	getDocs = (filter = {}, callback = () => {}) => {
		const self = this;
		const matchFilter = (o1, o2) =>
			Object.keys(o1).map((k) => _.isEqual(o1[k], o2[k]).filter((o) => !!o).length === Object.keys(o1).length);
		this.updateKeys((e, r) => {
			const result = [];
			if (r) {
				self.list.forEach(async (key, i) => {
					const res = await get(key, self.customStore).then((result) => {
						const docR = parse(result);
						if (matchFilter(filter, docR)) {
							result.push(self.updateDateOnJson(docR));
						}
					});
				});
			}

			callback(e, result);
		});
	};

	syncRemovedDocs = (removeDocFunc = () => {}) => {
		const self = this;
		const controlStoreData = this.getControlStoreData();
		(controlStoreData.removedDocs || []).forEach((docId) => {
			removeDocFunc({ _id: docId }, (e, r) => {
				if (!e) {
					self.delRemovedDocIntoControlStoreData(
						{ _id: docId },
						{
							date: new Date(),
							type: 'remove',
							status: 'success',
							docId
						}
					);
				} else {
					self.updateSyncHistory({
						date: new Date(),
						type: 'remove',
						status: 'error',
						error: e,
						docId
					});
				}
			});
		});
	};
	syncUpdatedDocs = (updateDocFunc = () => {}) => {
		const self = this;
		const controlStoreData = this.getControlStoreData();
		console.log('#syncUpdatedDocs', controlStoreData);
		(controlStoreData.updatedDocs || []).forEach((doc) => {
			updateDocFunc(doc, (e, serverDoc) => {
				if (!e) {
					if (!!serverDoc && !!serverDoc.removedServer) {
						this.cachedCollection.remove(serverDoc, undefined, true);
					} else {
						delete serverDoc.updatedServer;
						self.delUpdatedDocsIntoControlStoreData(doc, {
							date: new Date(),
							type: 'update',
							status: 'success',
							docId: doc._id
						});
						self.cachedCollection.update({ _id: serverDoc._id }, { $set: serverDoc }, {}, undefined, true);
					}
				} else {
					self.updateSyncHistory({
						date: new Date(),
						type: 'update',
						status: 'error',
						error: e,
						docId: doc._id
					});
				}
			});
		});
	};

	syncFromClient = (removeFunction, updateFunction) => {
		removeFunction && this.syncRemovedDocs(removeFunction);
		updateFunction && this.syncUpdatedDocs(updateFunction);
		this.updateControlStoreData({ lastClientSync: new Date() });
	};

	syncFromServer = (serverDocs) => {
		serverDocs.forEach((doc) => {
			if (!doc || !doc._id) {
				return;
			}
			if (doc.removedServer) {
				this.cachedCollection.remove(doc, undefined, true);
			} else {
				this.cachedCollection.update({ _id: doc._id }, { $set: doc }, {}, undefined, true);
			}
		});
	};
}

export class OfflineBaseApi extends ApiBase {
	constructor(apiName, apiSch, options) {
		super(apiName, apiSch, options);
		this.subscribe = this.subscribe.bind(this);
		this.findOne = this.findOne.bind(this);
		this.find = this.find.bind(this);
		this.callMethod = this.callMethod.bind(this);

		// Init chached collection
		this.minimongoStorage = new PersistentMinimongoStorage(apiName, this.collectionInstance);
		this.persistentCollectionInstance = this.minimongoStorage.cachedCollection;
	}

	/**
	 * Wrapper to find items on an collection.
	 * This guarantees the the action will be executed
	 * by a Meteor Mongo Collection of this framework.
	 * @param  {Object} query - Params to query a document.
	 * @param  {Object} projection - Params to define which fiedls will return.
	 */
	find(query, projection = {}) {
		if (Meteor.isClient) {
			return this.persistentCollectionInstance.find(query, projection);
		}
		return super.find(query, projection);
	}

	/**
	 * Wrapper to findOne items on an collection.
	 * This guarantees the the action will be executed
	 * by a Meteor Mongo Collection of this framework.
	 * @param  {Object} query - Params to query a document.
	 * @param  {Object} projection - Params to define which fiedls will return.
	 */
	findOne(query = {}, projection = {}) {
		if (Meteor.isClient) {
			return this.persistentCollectionInstance.findOne(query, projection);
		}
		return super.findOne(query, projection);
	}

	/**
	 * Make a subscribe for a collection.
	 * @param  {} api='default'
	 * @param  {} ...param
	 */
	subscribe(api = 'default', ...param) {
		const self = this;
		if (Meteor.isClient) {
			if (Meteor.status().status !== 'waiting') {
				// Sync Functions ###################################################
				if (self.minimongoStorage.needSync() && Meteor.status().connected) {
					self.minimongoStorage.syncFromClient(self.remove, self.sync);
				}

				// ##################################################################

				return Meteor.subscribe(`${self.collectionName}.${api}`, ...param);
			}

			return {
				ready: () => self.minimongoStorage.initCachedMinimongo().get()
			};
		}
		return null;
	}

	callOfflineMethod = (name, docObj, callback = () => {}) => {
		if (name === 'update') {
			const oldDoc = Meteor.status().connected
				? this.getCollectionInstance().findOne({ _id: docObj._id })
				: this.persistentCollectionInstance.findOne({ _id: docObj._id });
			this.persistentCollectionInstance[name]({ _id: docObj._id }, { ...(oldDoc || {}), ...docObj }, {}, callback);
		} else {
			this.persistentCollectionInstance[name](docObj, callback);
		}
	};

	/**
	 * Wrapper to the Meteor call. This check if the user has
	 * connection with the server, in this way we can return the result from
	 * a cached collection or from the server.
	 * @param  {String} name - Meteor method name defin
	 * @param  {Object} ...params - Parameters for this meteor method.
	 */
	callMethod(name, ...params) {
		const self = this;

		if (Meteor.status().connected) {
			Meteor.call(`${this.collectionName}.${name}`, ...params);
		} else if (Meteor.status().status === 'waiting') {
			if (name === 'insert' || name === 'update' || name === 'remove') {
				self.callOfflineMethod(name, ...params);
			} else {
				console.log('Sem Conexão com o Servidor');
			}

			// window.$app.globalFunctions.openSnackBar('SEM CONEXÃO COM O SERVIDOR:Sua operçaão não será registrada. Verifique sua conexão com a internet.', 'info');
		}
	}
}
