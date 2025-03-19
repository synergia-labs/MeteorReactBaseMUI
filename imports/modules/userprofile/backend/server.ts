import { Meteor } from "meteor/meteor";
import MethodBase from "/imports/base/server/methods/method.base";
import ProductServerBase from "/imports/base/server/server.product";
import EnumUserProfileSettings from "../common";
import { UserProfileServerMethods } from "../common/interfaces/methods";
import checkIfHasAdminUserCallMethodInstance from "./methods/checkIfHasAdminUser.callMethod";
import createUserCallMethodInstance from "./methods/createUser.callMethod";
import { Mongo } from "meteor/mongo";
import onLoginInstance from "./methods/onLogin";
import onLogoutInstance from "./methods/onLogout";
import sendVerificationEmailInstance from "./methods/sendVerificationEmail.callMethod";

/**Array com as instâncias de todas as classes de método do módulo */
const _methodInstances: Array<MethodBase<any, any, any>> = [
    checkIfHasAdminUserCallMethodInstance,
    createUserCallMethodInstance,
    sendVerificationEmailInstance
] as const;

const _serverSideMethods: Array<MethodBase<any, any, any>> = [
    onLoginInstance,
    onLogoutInstance
] as const;

/**Array com as instâncias de todas as classes de publicação do módulo */
const _publicationInstances: Array<any> = [
] as const;

class UserProfileServer extends ProductServerBase {
    public mongoInstance: Mongo.Collection<Meteor.User>;
    public storageInstance?: any;

    constructor() {
        super(EnumUserProfileSettings.MODULE_NAME);
        this.mongoInstance = Meteor.users;

        this.registerMethods(_methodInstances, this);
        this.registerMethods(_serverSideMethods, this, false);
        this.registerPublications(_publicationInstances, this);
    }
}

type interfaceWithMethods = UserProfileServerMethods & UserProfileServer;

const userProfileServer = new UserProfileServer() as interfaceWithMethods;
export default userProfileServer;
export type { interfaceWithMethods as UserProfileServer };