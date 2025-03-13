import { enumSecurityConfig } from './config.enum';

function getName(name: string) {
	return `${enumSecurityConfig.apiName}.${name}`;
}

export const enumSecurityMethods = {
	roleSafeInsert: getName('roleSafeInsert'),

	methodSafeInsert: getName('methodSafeInsert')
};
