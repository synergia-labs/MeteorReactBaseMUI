import { enumModuleNameSettings } from "../common/enums/settings";
import { ModuleNameMethodsType } from "../common/interfaces/methods";
import { methodExample } from "./methods/methodExample";
import { publicationExample } from "./publications/publicationExample";
import { MongoProduct } from "/imports/base/database/products/mongo.product";
import { Neo4jProduct } from "/imports/base/database/products/neo4j.product";
import MethodBase from "/imports/base/server/methods/method.base";
import PublicationBase from "/imports/base/server/publication/publication.base";
import ServerBase from "/imports/base/server/server.base";

const _methodInstances: Array<MethodBase<any, any, any>> = [methodExample];
const _publicationInstances: Array<PublicationBase<any, any, any>> = [publicationExample];

class ModuleNameServer extends ServerBase {
	private mongo = new MongoProduct(enumModuleNameSettings.MODULE_NAME);
	private neo4j = new Neo4jProduct();

	constructor() {
		super(enumModuleNameSettings.MODULE_NAME);
		this.registerMethods(_methodInstances, this);
		this.registerPublications(_publicationInstances, this);
	}
	getNeo4j = () => this.neo4j;
	getMongo = () => this.mongo;
}

export type ModuleNameServerType = ModuleNameServer & ModuleNameMethodsType;
const moduleNameServer = new ModuleNameServer() as ModuleNameServerType;
export default moduleNameServer;
