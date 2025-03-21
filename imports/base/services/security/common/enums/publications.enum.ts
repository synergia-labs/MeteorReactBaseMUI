import { enumSecurityConfig } from "./config.enum";

function getName(name: string) {
	return `${enumSecurityConfig.API_NAME}.${name}`;
}

export const enumSecurityPublications = {
	getAllRolesPublication: getName("getAllRoles"),
	getAllMethodsPublication: getName("getAllMethods")
};
