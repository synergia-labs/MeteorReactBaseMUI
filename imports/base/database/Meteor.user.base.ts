import { Mongo } from 'meteor/mongo';

export class UserBase {
	private collectionInstance: Mongo.Collection<any>;

	constructor(collectionInstance: Mongo.Collection<any>) {
		this.collectionInstance = collectionInstance;
		this.initCollection();
	}

	//region InitCollection
	/**
	 * Método para inicializar a collection
	 * Esse método garante que a collection não possa ser alterada pelo lado do cliente.
	 */
	private initCollection() {
		this.collectionInstance.deny({
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

	public find(obj: any) {
		this.collectionInstance.find({}, { ...obj, fields: { password: 0, services: 0 } });
	}
}
