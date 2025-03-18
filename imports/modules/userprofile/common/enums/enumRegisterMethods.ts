import EnumUserProfileSettings from "..";

const getName = (name: string): string => `${EnumUserProfileSettings.MODULE_NAME}.${name}`;

const enumUserProfileRegisterMethods = {
    sendVerificationEmail: getName('sendVerificationEmail'),
    checkIfHasAdminUser: getName('checkIfHasAdminUser'),
    create: getName('create'),
} as const;

const enumUserProfileRegisterPrivateMethods = {

} as const;

export default enumUserProfileRegisterMethods;
export { enumUserProfileRegisterPrivateMethods };