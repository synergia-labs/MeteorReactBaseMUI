import { MongoBase } from "/imports/base/database/mongo.base";
import MethodBase from "/imports/base/server/methods/method.base";
import ProductServerBase from "/imports/base/server/server.product";
import EnumUserProfileSettings from "../common";
import { UserProfileServerMethods } from "../common/interfaces/methods";
import { Meteor } from "meteor/meteor";
import checkIfHasAdminUserCallMethodInstance from "./methods/checkIfHasAdminUser.callMethod";
import createUserCallMethodInstance from "./methods/createUser.callMethod";

/**Array com as instâncias de todas as classes de método do módulo */
const _methodInstances: Array<MethodBase<any, any, any>> = [
    checkIfHasAdminUserCallMethodInstance,
    createUserCallMethodInstance
] as const;

/**Array com as instâncias de todas as classes de publicação do módulo */
const _publicationInstances: Array<any> = [
] as const;

class UserProfileServer extends ProductServerBase {
    public mongoInstance: MongoBase;
    public storageInstance?: any;

    constructor() {
        super(EnumUserProfileSettings.MODULE_NAME);
        this.mongoInstance = new MongoBase(EnumUserProfileSettings.MODULE_NAME, Meteor.users);

        this.registerMethods(_methodInstances, this);
        this.registerPublications(_publicationInstances, this);
    }
}



type interfaceWithMethods = UserProfileServerMethods & UserProfileServer;

const userProfileServer = new UserProfileServer() as interfaceWithMethods;
export default userProfileServer;
export type { interfaceWithMethods as UserProfileServer };