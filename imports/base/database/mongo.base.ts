import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export class MongoBase extends Mongo.Collection<any> {
	private collectionName: string;

	constructor(collectionName: string) {
		super(collectionName);
		this.collectionName = collectionName;
		this.initCollection();
	}

	//region InitCollection
	/**
	 * Método para inicializar a collection
	 * Esse método garante que a collection não possa ser alterada pelo lado do cliente.
	 */
	private initCollection() {
		super.deny({
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
	//endregion
}
