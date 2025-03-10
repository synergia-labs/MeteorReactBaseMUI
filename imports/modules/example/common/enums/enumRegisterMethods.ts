import EnumExampleSettings from "..";

const getName = (name: string): string => `${EnumExampleSettings.MODULE_NAME}.${name}`;

const enumExampleRegisterMethods = {
    fillDatabaseWithFakeData: getName('fillDatabaseWithFakeData'),
} as const;

export default enumExampleRegisterMethods;