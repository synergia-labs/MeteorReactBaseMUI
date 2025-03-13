import EnumUserProfileSettings from "..";

const getName = (name: string): string => `${EnumUserProfileSettings.MODULE_NAME}.${name}`;

const enumUserProfileRegisterMethods = {
    sendVerificationEmail: getName('sendVerificationEmail'),
    checkIfHasAdminUser: getName('checkIfHasAdminUser'),
    create: getName('create'),
} as const;

export default enumUserProfileRegisterMethods;