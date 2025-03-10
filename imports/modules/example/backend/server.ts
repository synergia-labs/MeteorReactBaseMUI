import fillDatabaseWithFakeDataInstance from "./methods/fillDatabaseWithFakeData.callMethod";
import exampleListPublicationInstance from "./publications/exampleList.publication";
import { MongoBase } from "/imports/base/database/mongo.base";
import MethodBase from "/imports/base/server/methods/method.base";
import ProductServerBase from "/imports/base/server/server.product";
import { ExampleServerMethods } from "../common/interfaces/methods";
import EnumExampleSettings from "../common";

/**Array com as instâncias de todas as classes de método do módulo */
const _methodInstances: Array<MethodBase<any, any, any>> = [
    fillDatabaseWithFakeDataInstance,
] as const;

/**Array com as instâncias de todas as classes de publicação do módulo */
const _publicationInstances: Array<any> = [
    exampleListPublicationInstance,
] as const;

class ExampleServer extends ProductServerBase {
    public mongoInstance: MongoBase;
    public storageInstance?: any;

    constructor() {
        super(EnumExampleSettings.MODULE_NAME);
        this.mongoInstance = new MongoBase(EnumExampleSettings.MODULE_NAME);

        this.registerMethods(_methodInstances, this);
        this.registerPublications(_publicationInstances, this);
    }
}



type teste = ExampleServerMethods & ExampleServer;

const exampleServer = new ExampleServer() as teste;
export default exampleServer;
export type { teste as ExampleServer  };