import { enumUsersSettings } from "./settings";

const getName = (name: string): string => `${enumUsersSettings.MODULE_NAME}.${name}`;

const enumUsersRegisterPublications = {
	getUsersListPublication: getName("getUsersListPublication")
} as const;

export default enumUsersRegisterPublications;
