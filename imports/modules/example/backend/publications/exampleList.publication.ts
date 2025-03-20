import { Mongo } from "meteor/mongo";
import PublicationBase from "/imports/base/server/publication/publication.base";
import { IContext } from "/imports/typings/IContext";
import { ExampleServer } from "../server";
import enumExampleRegisterPublications from "../../common/enums/enumRegisterPublications";

class ExampleListPublication extends PublicationBase<ExampleServer, undefined, undefined> {
	constructor() {
		super({
			name: enumExampleRegisterPublications.exampleList,
			enableCountPublication: true,
			transformedPublication: true
		});
	}

	async action(
		_filter: Mongo.Selector<undefined>,
		_options: Mongo.Options<undefined>,
		_context: IContext
	): Promise<Mongo.Cursor<any>> {
		return this.getServerInstance()?.mongoInstance?.getCollectionInstance().find(_filter, _options) as Mongo.Cursor<any>;
	}

	async transformPublication(_doc: any, _context: IContext): Promise<any> {
		return { ..._doc, teste: "teste" };
	}
}

const exampleListPublicationInstance = new ExampleListPublication();
export default exampleListPublicationInstance;
