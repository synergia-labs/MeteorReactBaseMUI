import fillDatabaseWithFakeDataInstance from "./methods/fillDatabaseWithFakeData.callMethod";
import exampleListPublicationInstance from "./publications/exampleList.publication";
import { MongoBase } from "/imports/base/database/mongo.base";
import MethodBase from "/imports/base/server/methods/method.base";
import { IExampleServerMethodsType } from "../common/interfaces/methods";
import enumExampleSettings from "../common";
import ServerBase from "/imports/base/server/server.base";

/**Array com as instâncias de todas as classes de método do módulo */
const _methodInstances: Array<MethodBase<any, any, any>> = [fillDatabaseWithFakeDataInstance] as const;

/**Array com as instâncias de todas as classes de publicação do módulo */
const _publicationInstances: Array<any> = [exampleListPublicationInstance] as const;

class ExampleServer extends ServerBase {
	public mongoInstance: MongoBase;
	public storageInstance?: any;

	constructor() {
		super(enumExampleSettings.MODULE_NAME);
		this.mongoInstance = new MongoBase(enumExampleSettings.MODULE_NAME);

		this.registerMethods(_methodInstances, this);
		this.registerPublications(_publicationInstances, this);
	}
}

type TesteType = IExampleServerMethodsType & ExampleServer;

const exampleServer = new ExampleServer() as TesteType;
export default exampleServer;
export type { TesteType as ExampleServer };
