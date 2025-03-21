import enumExampleSettings from "..";

const getName = (name: string): string => `${enumExampleSettings.MODULE_NAME}.${name}`;

const enumUsersRegisterPublications = {
	getUsersListPublication: getName("getUsersListPublication")
} as const;

export default enumUsersRegisterPublications;
