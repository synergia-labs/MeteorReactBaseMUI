import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export class MongoBase {
	private collectionName: string;
	private collectionInstance: Mongo.Collection<any>;

	constructor(collectionName: string) {
		this.collectionName = collectionName;
		this.collectionInstance =  collectionName == 'users' ? Meteor.users : new Mongo.Collection(this.collectionName);
		this.initCollection();
	}

	//region InitCollection
	/**
	 * Método para inicializar a collection
	 * Esse método garante que a collection não possa ser alterada pelo lado do cliente.
	*/
	private initCollection() {
		this.collectionInstance.deny({
			insert() { return true; },
			update() { return true; },
			remove() { return true; }
		});
	}
	//endregion

	//region seters and getters
	public getCollectionInstance = () : Mongo.Collection<any> => this.collectionInstance ;
	public getCollectionName = () : string => this.collectionName;
	//endregion

	public find = (filter?: Mongo.ObjectID | Mongo.Selector<any> | string, options?: Mongo.Options<any>) => 
		this.collectionInstance.find(filter || {}, options || {});

	public findOne = (filter?: Mongo.ObjectID | Mongo.Selector<any> | string, options?: Omit<Mongo.Options<any>, 'limt'>) =>
		this.collectionInstance.findOne(filter, options);
};