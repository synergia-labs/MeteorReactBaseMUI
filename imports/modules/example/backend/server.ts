import { Meteor } from "meteor/meteor";
import fillDatabaseWithFakeDataInstance from "./methods/fillDatabaseWithFakeData.callMethod";
import exampleListPublicationInstance from "./publications/exampleList.publication";
import { MongoBase } from "/imports/base/database/mongo.base";
import MethodBase from "/imports/base/server/methods/method.base";
import { MethodType } from "/imports/base/server/server.base";
import ProductServerBase from "/imports/base/server/server.product";
import { ExampleServerMethods } from "../common/interfaces/methods";

/**Array com as instâncias de todas as classes de método do módulo */
const _methodInstances: Array<MethodBase<any, any, any>> = [
    fillDatabaseWithFakeDataInstance,
] as const;

/**Array com as instâncias de todas as classes de publicação do módulo */
const _publicationInstances: Array<any> = [
    exampleListPublicationInstance,
] as const;

class ExampleServer extends ProductServerBase {
    mongoInstance?: MongoBase<{}>;
    storageInstance?: any;

    constructor() {
        super('example');
        this.mongoInstance = new MongoBase<{}>('example', {});

        this.registerMethods(_methodInstances, this);
        this.registerPublications(_publicationInstances, this);
    }

    getAllMethodsNames = (): Array<string> => _methodInstances.map((method) => method.getName());
    getAllPublicationsNames = (): Array<string> => _publicationInstances.map((publication) => publication.getName());
    
}



type teste = ExampleServerMethods & ExampleServer;

const exampleServer = new ExampleServer() as teste;
export default exampleServer;
export type { teste as ExampleServer  };