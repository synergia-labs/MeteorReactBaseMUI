import { enumSecurityConfig } from "./config.enum";

function getName(name: string) {
	return `${enumSecurityConfig.apiName}.${name}`;
}

export const enumSecurityPublications = {
	getAllRolesPublication: getName("getAllRoles"),
	getAllMethodsPublication: getName("getAllMethods")
};
