import { MongoBase } from "/imports/base/database/mongo.base";
import MethodBase from "/imports/base/server/methods/method.base";
import ProductServerBase from "/imports/base/server/server.product";
import EnumUserProfileSettings from "../common";
import { UserProfileServerMethods } from "../common/interfaces/methods";

/**Array com as instâncias de todas as classes de método do módulo */
const _methodInstances: Array<MethodBase<any, any, any>> = [
] as const;

/**Array com as instâncias de todas as classes de publicação do módulo */
const _publicationInstances: Array<any> = [
] as const;

class UserProfileServer extends ProductServerBase {
    public mongoInstance: MongoBase;
    public storageInstance?: any;

    constructor() {
        super(EnumUserProfileSettings.MODULE_NAME);
        this.mongoInstance = new MongoBase(EnumUserProfileSettings.MODULE_NAME);

        this.registerMethods(_methodInstances, this);
        this.registerPublications(_publicationInstances, this);
    }
}



type interfaceWithMethods = UserProfileServerMethods & UserProfileServer;

const exampleServer = new UserProfileServer() as interfaceWithMethods;
export default exampleServer;
export type { interfaceWithMethods as UserProfileServer };