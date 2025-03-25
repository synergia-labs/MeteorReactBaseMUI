import { enumExampleSettings } from "../common/enums/settings";
import { IExampleServerMethodsType } from "../common/interfaces/methods";
import { methodExample } from "./methods/methodExample";
import { publicationExample } from "./publications/publicationExample";
import { MongoBase } from "/imports/base/database/mongo.base";
// import { Neo4jBase } from "/imports/base/database/neo4j.base";
import MethodBase from "/imports/base/server/methods/method.base";
import PublicationBase from "/imports/base/server/publication/publication.base";
import ServerBase from "/imports/base/server/server.base";

const _methodInstances: Array<MethodBase<any, any, any>> = [methodExample];
const _publicationInstances: Array<PublicationBase<any, any, any>> = [publicationExample];

export class ExampleServer extends ServerBase {
	private mongo = new MongoBase(enumExampleSettings.MODULE_NAME);
	// private neo4j = new Neo4jBase(enumExampleSettings.MODULE_NAME);

	constructor() {
		super(enumExampleSettings.MODULE_NAME);
		this.registerMethods(_methodInstances, this);
		this.registerPublications(_publicationInstances, this);
	}
}

const exampleServer = new ExampleServer() as ExampleServer & IExampleServerMethodsType;
export default exampleServer;
