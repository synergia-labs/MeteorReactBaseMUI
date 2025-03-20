import { Meteor } from "meteor/meteor";
import MethodBase from "/imports/base/server/methods/method.base";
import EnumUserProfileSettings from "../common";
import { UserProfileServerMethods } from "../common/interfaces/methods";
import checkIfHasAdminUserCallMethodInstance from "./methods/checkIfHasAdminUser.callMethod";
import createUserCallMethodInstance from "./methods/createUser.callMethod";
import { Mongo } from "meteor/mongo";
import onLoginInstance from "./methods/onLogin";
import onLogoutInstance from "./methods/onLogout";
import sendVerificationEmailInstance from "./methods/sendVerificationEmail.callMethod";
import ServerBase from "/imports/base/server/server.base";
import sendResetPasswordInstance from "./methods/sendResetPasswordEmail";
import resetUserPasswordInstance from "./methods/resetUserPassword";

/**Array com as instâncias de todas as classes de método do módulo */
const _methodInstances: Array<MethodBase<any, any, any>> = [
	checkIfHasAdminUserCallMethodInstance,
	createUserCallMethodInstance,
	sendVerificationEmailInstance,
	sendResetPasswordInstance,
	onLoginInstance,
	onLogoutInstance,
	resetUserPasswordInstance
] as const;

/**Array com as instâncias de todas as classes de publicação do módulo */
const _publicationInstances: Array<any> = [] as const;

class UserProfileServer extends ServerBase {
	public mongoInstance: Mongo.Collection<Meteor.User>;
	public storageInstance?: any;

	constructor() {
		super(EnumUserProfileSettings.MODULE_NAME);
		this.mongoInstance = Meteor.users;

		this.registerMethods(_methodInstances, this);
		this.registerPublications(_publicationInstances, this);
	}
}

type interfaceWithMethods = UserProfileServerMethods & UserProfileServer;

const userProfileServer = new UserProfileServer() as interfaceWithMethods;
export default userProfileServer;
export type { interfaceWithMethods as UserProfileServer };
