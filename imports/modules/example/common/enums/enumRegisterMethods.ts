import enumExampleSettings from "..";

const getName = (name: string): string => `${enumExampleSettings.MODULE_NAME}.${name}`;

const enumExampleRegisterMethods = {
	fillDatabaseWithFakeData: getName("fillDatabaseWithFakeData")
} as const;

export default enumExampleRegisterMethods;
