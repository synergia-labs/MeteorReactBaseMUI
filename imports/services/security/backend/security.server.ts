import { MongoBase } from "../../../base/database/mongo.base";
import MethodBase from "../../../base/server/methods/method.base";
import PublicationBase from "../../../base/server/publication/publication.base";
import ServerBase from "../../../base/server/server.base";
import { enumSecurityConfig } from "../common/enums/config";
import { ISecurityServerMethods } from "../common/interfaces/methods";
import { checkMethodPermission } from "./methods/checkMethodPermission";
import { getMethod } from "./methods/getMethod";
import { getRole } from "./methods/getRole";
import { methodSafeInsert } from "./methods/methodSafeInsert";
import { roleSafeInsert } from "./methods/roleSafeInsert";
import { getAllMethodsPublication } from "./publications/getAllMethods";
import { getAllRolesPublication } from "./publications/getAllRoles";
import { getRolesListNames } from "./methods/getRolesListNames";

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
	static mongoRole = new MongoBase(enumSecurityConfig.ROLE_COLLECTION_NAME);
	static mongoMethod = new MongoBase(enumSecurityConfig.METHOD_COLLECTION_NAME);

	constructor() {
		super(enumSecurityConfig.API_NAME);
		this.registerMethods(_methodInstances, this);
		this.registerPublications(_publicationInstances, this);
	}

	getRoleCollection = () => SecurityServer.mongoRole;
	getMethodCollection = () => SecurityServer.mongoMethod;
}

const securityServer = new SecurityServer() as SecurityServer & ISecurityServerMethods;
export default securityServer;
