import { enumUsersSettings } from "../enums/settings";

export function getUsersActionName(name: string) {
	return `${enumUsersSettings.MODULE_NAME}.${name}`;
}
