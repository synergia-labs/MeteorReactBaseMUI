import { enumSecurityConfig } from "./config.enum";

function getName(name: string) {
	return `${enumSecurityConfig.API_NAME}.${name}`;
}

export const enumSecurityMethods = {
	roleSafeInsert: getName("roleSafeInsert"),
	getRole: getName("getRole"),
	getRolesListNames: getName("getRolesListNames"),
	methodSafeInsert: getName("methodSafeInsert"),
	getMethod: getName("getMethod"),
	checkMethodPermission: getName("checkMethodPermission")
};
