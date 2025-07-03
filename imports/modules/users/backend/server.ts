import { Meteor } from "meteor/meteor";
import MethodBase from "/imports/base/server/methods/method.base";
import checkIfHasAdminUserCallMethodInstance from "./methods/checkIfHasAdminUser.callMethod";
import createUserCallMethodInstance from "./methods/createUser.callMethod";
import { Mongo } from "meteor/mongo";
import onLoginInstance from "./accountsMethods/onLogin";
import onLogoutInstance from "./accountsMethods/onLogout";
import ServerBase from "/imports/base/server/server.base";
import sendResetPasswordInstance from "./accountsMethods/sendResetPasswordEmail";
import resetUserPasswordInstance from "./accountsMethods/resetUserPassword";
import { getUsersListPublication } from "./publications/usersList.publication";
import validateLoginAttemptInstance from "./accountsMethods/validateLoginAttempt";
import getUserPhotoCallMethodInstance from "./methods/getUserPhoto";
import { enumUsersSettings } from "../common/enums/settings";
import { IUsersServerMethods } from "../common/interfaces/methods";
import onCreateUserInstance from "./accountsMethods/onCreateUser";
import updateUser from "./methods/updateUser";
import upsertUser from "./methods/upsertUser";
import countUsers from "./methods/countUsers";
import enableUser from "./methods/enableUser";
import disableUser from "./methods/disableUser";
import sendVerificationEmail from "./accountsMethods/sendVerificationEmail.callMethod";
import sendEnrolEmail from "./accountsMethods/sendEnrolEmail";

/**Array com as instâncias de todas as classes de método do módulo */
const _methodInstances: Array<MethodBase<any, any, any>> = [
	checkIfHasAdminUserCallMethodInstance,
	createUserCallMethodInstance,
	sendResetPasswordInstance,
	onLoginInstance,
	onLogoutInstance,
	resetUserPasswordInstance,
	validateLoginAttemptInstance,
	getUserPhotoCallMethodInstance,
	onCreateUserInstance,
	updateUser,
	upsertUser,
	countUsers,
	enableUser,
	disableUser,
	sendVerificationEmail,
	sendEnrolEmail
] as const;

/**Array com as instâncias de todas as classes de publicação do módulo */
const _publicationInstances: Array<any> = [getUsersListPublication] as const;

class UsersServer extends ServerBase {
	private mongoInstance: Mongo.Collection<Meteor.User>;

	constructor() {
		super(enumUsersSettings.MODULE_NAME as string);
		this.mongoInstance = Meteor.users;

		this.registerMethods(_methodInstances, this);
		this.registerPublications(_publicationInstances, this);
	}

	public getMongo = (): Mongo.Collection<Meteor.User> => this.mongoInstance;
}

type InterfaceWithMethodsType = IUsersServerMethods & UsersServer;

const usersServer = new UsersServer() as InterfaceWithMethodsType;
export default usersServer;
export type { InterfaceWithMethodsType as UsersServer };
