import ApiBase from "../../api/api.base";
import { MongoBase } from "../../database/mongo.base";
import { enumSecurityConfig } from "./common/enums/config.enum";
import { enumSecurityMethods } from "./common/enums/methods.enum";
import { enumSecurityPublications } from "./common/enums/publications.enum";
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
