import { enumModuleNameSettings } from "../common/enums/settings";
import { IModuleNameServerMethodsType } from "../common/interfaces/methods";
import { methodExample } from "./methods/methodExample";
import { publicationExample } from "./publications/publicationExample";
import { MongoBase } from "/imports/base/database/mongo.base";
// import { Neo4jBase } from "/imports/base/database/neo4j.base";
import MethodBase from "/imports/base/server/methods/method.base";
import PublicationBase from "/imports/base/server/publication/publication.base";
import ServerBase from "/imports/base/server/server.base";

const _methodInstances: Array<MethodBase<any, any, any>> = [methodExample];
const _publicationInstances: Array<PublicationBase<any, any, any>> = [publicationExample];

export class ModuleNameServer extends ServerBase {
	private mongo = new MongoBase(enumModuleNameSettings.MODULE_NAME);
	// private neo4j = new Neo4jBase(enumModuleNameSettings.MODULE_NAME);

	constructor() {
		super(enumModuleNameSettings.MODULE_NAME);
		this.registerMethods(_methodInstances, this);
		this.registerPublications(_publicationInstances, this);
	}
}

const moduleNameServer = new ModuleNameServer() as ModuleNameServer & IModuleNameServerMethodsType;
export default moduleNameServer;
