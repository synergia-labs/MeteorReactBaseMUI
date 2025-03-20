import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { createStore, get, set, del } from 'idb-keyval';

interface ControlStoreData {
	removedDocs: string[];
	updatedDocs: string[];
	lastClientSync: Date;
}

export class PersistentMinimongoStorage<T extends Document & { _id: string }> {
	private cachedCollection: Mongo.Collection<T>;
	private store = createStore('app_db', 'collection-store');
	private controlStore = createStore('app_db', 'control-store');
	private controlData: ControlStoreData = { removedDocs: [], updatedDocs: [], lastClientSync: new Date() };

	constructor(private collection: Mongo.Collection<T>) {
		this.cachedCollection = new Mongo.Collection<T>(null);
		this.loadFromStorage();
		this.syncWithMeteor();
	}

	private async loadFromStorage() {
		const keys = (await get<string[]>('keys', this.store)) || [];
		for (const key of keys) {
			const doc = await get(key, this.store);
			if (doc) this.cachedCollection.insert(doc);
		}
		this.controlData = (await get<ControlStoreData>('control', this.controlStore)) || this.controlData;
	}

	insert(doc: any) {
		this.cachedCollection.insert(doc);
		set(doc._id, doc, this.store);
		this.controlData.updatedDocs.push(doc._id);
		set('control', this.controlData, this.controlStore);
	}

	update(selector: { _id: string }, modifier: Partial<T>) {
		this.cachedCollection.update(selector._id, { $set: modifier });
		const updatedDoc = this.cachedCollection.findOne(selector._id);
		if (updatedDoc) set(selector._id, updatedDoc, this.store);
		this.controlData.updatedDocs.push(selector._id);
		set('control', this.controlData, this.controlStore);
	}

	remove(selector: { _id: string }) {
		this.cachedCollection.remove(selector._id);
		del(selector._id, this.store);
		this.controlData.removedDocs.push(selector._id);
		set('control', this.controlData, this.controlStore);
	}

	private syncWithMeteor() {
		this.collection.find({}).observe({
			added: (doc) => this.insert(doc),
			changed: (newDoc) => this.update({ _id: newDoc._id }, newDoc),
			removed: (doc) => this.remove({ _id: doc._id })
		});
	}
}

export class OfflineBaseApi<T extends { _id: string } & Document> {
	private collection: Mongo.Collection<T>;
	private storage: PersistentMinimongoStorage<T>;

	constructor(collectionName: string) {
		this.collection = new Mongo.Collection<T>(collectionName);
		this.storage = new PersistentMinimongoStorage<T>(this.collection);
	}

	insert(doc: T) {
		this.storage.insert(doc);
	}

	update(_id: string, modifier: Partial<T>) {
		this.storage.update({ _id }, modifier);
	}

	remove(_id: string) {
		this.storage.remove({ _id });
	}

	find(selector?: Partial<T>) {
		return this.collection.find(selector as Mongo.Selector<T>).fetch();
	}
}
