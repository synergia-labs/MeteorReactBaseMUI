import { MongoBase } from '../../database/mongo.base';
import MethodBase from '../../server/methods/method.base';
import ServerBase from '../../server/server.base';
import { enumSecurityConfig } from './common/enums/config.enum';

const _methodInstances: Array<MethodBase<any, any, any>> = [] as const;

export class SecurityServer extends ServerBase {
	private mongoRole = new MongoBase(enumSecurityConfig.roleCollectionName);
	private mongoMethod = new MongoBase(enumSecurityConfig.methodCollectionName);

	constructor() {
		super(enumSecurityConfig.apiName);
		this.registerMethods(_methodInstances, this);
	}

	getRoleCollection() {
		return this.mongoRole;
	}
	getMethodCollection() {
		return this.mongoMethod;
	}
}

const securityServer = new SecurityServer();
export default securityServer;
