import { enumUsersSettings } from "./settings";

const getName = (name: string): string => `${enumUsersSettings.MODULE_NAME}.${name}`;

const enumUsersRegisterMethods = {
	checkIfHasAdminUser: getName("checkIfHasAdminUser"),
	createUser: getName("createUser"),
	getUserPhoto: getName("getUserPhoto"),
	sendResetPasswordEmail: getName("sendResetPasswordEmail"),
	sendVerificationEmail: getName("sendVerificationEmail"),
	updateUser: getName("updateUser"),
	upsertUser: getName("upsertUser"),
	countUsers: getName("countUsers"),
	enableUser: getName("enableUser"),
	disableUser: getName("disableUser"),
	sendEnrolEmail: getName("sendEnrolEmail"),
	getUserBySimilarity: getName("getUserBySimilarity"),
	setSimilarity: getName("setSimilarity"),
	setIsMappeable: getName("setIsMappeable")
} as const;

export default enumUsersRegisterMethods;
