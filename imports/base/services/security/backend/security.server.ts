import { MongoBase } from '../../../database/mongo.base';
import MethodBase from '../../../server/methods/method.base';
import PublicationBase from '../../../server/publication/publication.base';
import ServerBase from '../../../server/server.base';
import { enumSecurityConfig } from '../common/enums/config.enum';
import { SecurityServerMethods } from '../common/interfaces/methods';
import { checkMethodPermission } from './methods/checkMethodPermission';
import { getMethod } from './methods/getMethod';
import { getRole } from './methods/getRole';
import { getRolesListNames } from './methods/getRolesListNames';
import { methodSafeInsert } from './methods/methodSafeInsert';
import { roleSafeInsert } from './methods/roleSafeInsert';
import { getAllMethodsPublication } from './publications/getAllMethods';
import { getAllRolesPublication } from './publications/getAllRoles';

const _methodInstances: Array<MethodBase<any, any, any>> = [
	roleSafeInsert,
	methodSafeInsert,
	getRole,
	getMethod,
	checkMethodPermission,
	getRolesListNames
] as const;

const _publicationInstances: Array<PublicationBase<any, any, any>> = [
	getAllMethodsPublication,
	getAllRolesPublication
] as const;

export class SecurityServer extends ServerBase {
	static mongoRole = new MongoBase(enumSecurityConfig.roleCollectionName);
	static mongoMethod = new MongoBase(enumSecurityConfig.methodCollectionName);

	constructor() {
		super(enumSecurityConfig.apiName);
		this.registerMethods(_methodInstances, this);
		this.registerPublications(_publicationInstances, this);
	}

	getRoleCollection = () => SecurityServer.mongoRole;
	getMethodCollection = () => SecurityServer.mongoMethod;
}

const securityServer = new SecurityServer() as SecurityServer & SecurityServerMethods;
export default securityServer;
