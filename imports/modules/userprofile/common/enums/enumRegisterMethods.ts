import EnumUserProfileSettings from '..';

const getName = (name: string): string => `${EnumUserProfileSettings.MODULE_NAME}.${name}`;

const enumUserProfileRegisterMethods = {
	sendVerificationEmail: getName('sendVerificationEmail'),
	sendResetPasswordEmail: getName('sendResetPasswordEmail'),
	checkIfHasAdminUser: getName('checkIfHasAdminUser'),
	create: getName('create'),
	resetUserPassword: getName('resetUserPassword')
} as const;

const enumUserProfileRegisterPrivateMethods = {} as const;

export default enumUserProfileRegisterMethods;
export { enumUserProfileRegisterPrivateMethods };
