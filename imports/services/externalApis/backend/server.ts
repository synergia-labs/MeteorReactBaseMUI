import MethodBase from "../../../base/server/methods/method.base";
import ServerBase from "../../../base/server/server.base";
import { enumExternalApiConfig } from "../common/enums/config";
import { IExternalApiServerMethods } from "../common/interfaces/methods";
import { azureRegisterOauth } from "./methods/azureOauthRegister";
import { getAzureCompanyInfo } from "./methods/getCompanyInfo";
import { getEntraAccessToken } from "./methods/getEntraAccessToken";
import { getAzureGroupMembers } from "./methods/getGroupMembers";
import { getAzureGroupList } from "./methods/getGroupsList";
import { getAzureUserInfo } from "./methods/getUserInfo";
import { getAzureUserPhoto } from "./methods/getUserPhoto";
import { getAzureUserList } from "./methods/getUsersList";
import { validateAzureTenantId } from "./methods/validateAzureTenantId";

const _methodInstances: Array<MethodBase<any, any, any>> = [
	getEntraAccessToken,
	getAzureCompanyInfo,
	getAzureUserInfo,
	getAzureUserPhoto,
	azureRegisterOauth,
	validateAzureTenantId,
	getAzureUserList,
	getAzureGroupList,
	getAzureGroupMembers
] as const;

export class ExternalApiServiceServer extends ServerBase {
	constructor() {
		super(enumExternalApiConfig.API_NAME);
		this.registerMethods(_methodInstances, this);
	}
}

export type ExternalApiServiceServerType = ExternalApiServiceServer & IExternalApiServerMethods;
const externalApiServer = new ExternalApiServiceServer() as ExternalApiServiceServerType;
export default externalApiServer;
