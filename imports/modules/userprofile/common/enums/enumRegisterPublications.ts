import EnumExampleSettings from "..";

const getName = (name: string): string => `${EnumExampleSettings.MODULE_NAME}.${name}`;

const enumUsersRegisterPublications = {
	getUsersListPublication: getName("getUsersListPublication")
} as const;

export default enumUsersRegisterPublications;
