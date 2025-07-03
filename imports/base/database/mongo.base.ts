import { Mongo } from "meteor/mongo";
import { Document } from "mongodb";

export class MongoBase<T extends Document> extends Mongo.Collection<T> {
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
