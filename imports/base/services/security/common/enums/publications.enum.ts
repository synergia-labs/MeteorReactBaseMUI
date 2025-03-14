import { enumSecurityConfig } from './config.enum';

function getName(name: string) {
	return `${enumSecurityConfig.apiName}.${name}`;
}

export const enumSecurityPublications = {
	getRoles: getName('getRoles'),
	getMethods: getName('getMethods')
};
