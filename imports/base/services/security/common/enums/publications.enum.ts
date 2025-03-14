import { enumSecurityConfig } from './config.enum';

function getName(name: string) {
	return `${enumSecurityConfig.apiName}.${name}.publication`;
}

export const enumSecurityPublications = {
	getAllRolesPublication: getName('getAllRoles'),
	getAllMethodsPublication: getName('getAllMethods')
};
