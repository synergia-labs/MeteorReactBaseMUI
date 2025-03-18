import { enumSecurityConfig } from './config.enum';

function getName(name: string) {
	return `${enumSecurityConfig.apiName}.${name}`;
}

export const enumSecurityMethods = {
	roleSafeInsert: getName('roleSafeInsert'),
	getRole: getName('getRole'),

	methodSafeInsert: getName('methodSafeInsert'),
	getMethod: getName('getMethod'),

	checkMethodPermission: getName('checkMethodPermission')
};
