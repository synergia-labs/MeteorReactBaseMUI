import EnumUserProfileSettings from "..";

const getName = (name: string): string => `${EnumUserProfileSettings.MODULE_NAME}.${name}`;

const enumUserProfileRegisterMethods = {
	checkIfHasAdminUser: getName("checkIfHasAdminUser"),
	create: getName("create"),
	getUserPhoto: getName("getUserPhoto"),
	sendResetPasswordEmail: getName("sendResetPasswordEmail")
} as const;

const enumUserProfileRegisterPrivateMethods = {} as const;

export default enumUserProfileRegisterMethods;
export { enumUserProfileRegisterPrivateMethods };
