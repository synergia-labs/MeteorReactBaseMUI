import ApiBase from '../../api/api.base';
import { MongoBase } from '../../database/mongo.base';
import { enumSecurityConfig } from './common/enums/config.enum';
import { enumSecurityMethods } from './common/enums/methods.enum';
import { enumSecurityPublications } from './common/enums/publications.enum';
import { SecurityApiMethods } from './common/interfaces/methods';
import { SecurityApiPublication } from './common/interfaces/publications';

class SecurityApi extends ApiBase {
	public mongoRole = new MongoBase(enumSecurityConfig.roleCollectionName);
	public mongoMethod = new MongoBase(enumSecurityConfig.methodCollectionName);

	constructor() {
		super(enumSecurityMethods, enumSecurityPublications);
	}
}

export type SecurityApiType = SecurityApi & SecurityApiMethods & SecurityApiPublication;

const securityApi = new SecurityApi() as SecurityApiType;
export default securityApi;
