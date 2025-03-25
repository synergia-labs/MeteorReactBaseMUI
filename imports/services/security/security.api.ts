import ApiBase from "../../base/api/api.base";
import { MongoBase } from "../../base/database/mongo.base";
import { enumSecurityConfig } from "./common/enums/config";
import { enumSecurityMethods } from "./common/enums/methods";
import { enumSecurityPublications } from "./common/enums/publications";
import { SecurityApiMethodsType } from "./common/interfaces/methods";
import { ISecurityApiPublication } from "./common/interfaces/publications";

class SecurityApi extends ApiBase {
	public mongoRole = new MongoBase(enumSecurityConfig.ROLE_COLLECTION_NAME);
	public mongoMethod = new MongoBase(enumSecurityConfig.METHOD_COLLECTION_NAME);

	constructor() {
		super(enumSecurityMethods, enumSecurityPublications);
	}
}

export type SecurityApiType = SecurityApi & SecurityApiMethodsType & ISecurityApiPublication;

const securityApi = new SecurityApi() as SecurityApiType;
export default securityApi;
