import { MongoBase } from '../../database/mongo.base';
import MethodBase from '../../server/methods/method.base';
import ServerBase from '../../server/server.base';
import { enumSecurityConfig } from './common/enums/config.enum';
import { SecurityServerMethods } from './common/interfaces/methods';
import { getMethod } from './methods/getMethod';
import { getRole } from './methods/getRole';
import { methodSafeInsert } from './methods/methodSafeInsert';
import { roleSafeInsert } from './methods/roleSafeInsert';

const _methodInstances: Array<MethodBase<any, any, any>> = [
	roleSafeInsert,
	methodSafeInsert,
	getRole,
	getMethod
] as const;

export class SecurityServer extends ServerBase {
	private mongoRole = new MongoBase(enumSecurityConfig.roleCollectionName);
	private mongoMethod = new MongoBase(enumSecurityConfig.methodCollectionName);

	constructor() {
		super(enumSecurityConfig.apiName);
		this.registerMethods(_methodInstances, this);
	}

	getRoleCollection = () => this.mongoRole;
	getMethodCollection = () => this.mongoMethod;
}

const securityServer = new SecurityServer() as SecurityServer & SecurityServerMethods;
export default securityServer;
