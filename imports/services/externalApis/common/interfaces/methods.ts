import { TransformServerToApiMethodsType } from "../../../../types/serverApiMethods";
import { azureRegisterOauth } from "../../backend/methods/azureOauthRegister";
import { getAzureCompanyInfo } from "../../backend/methods/getCompanyInfo";
import { getEntraAccessToken } from "../../backend/methods/getEntraAccessToken";
import { getAzureGroupMembers } from "../../backend/methods/getGroupMembers";
import { getAzureGroupList } from "../../backend/methods/getGroupsList";
import { getAzureUserInfo } from "../../backend/methods/getUserInfo";
import { getAzureUserPhoto } from "../../backend/methods/getUserPhoto";
import { getAzureUserList } from "../../backend/methods/getUsersList";
import { validateAzureTenantId } from "../../backend/methods/validateAzureTenantId";
import { MethodType } from "/imports/types/method";

interface IExternalApiServerMethods extends Record<string, (...args: any) => any> {
	getEntraAccessToken: MethodType<typeof getEntraAccessToken>;
	getAzureCopmanyInfo: MethodType<typeof getAzureCompanyInfo>;
	getAzureUserInfo: MethodType<typeof getAzureUserInfo>;
	getAzureUserPhoto: MethodType<typeof getAzureUserPhoto>;
	azureRegisterOauth: MethodType<typeof azureRegisterOauth>;
	validateAzureTenantId: MethodType<typeof validateAzureTenantId>;
	getAzureUserList: MethodType<typeof getAzureUserList>;
	getAzureGroupList: MethodType<typeof getAzureGroupList>;
	getAzureGroupMembers: MethodType<typeof getAzureGroupMembers>;
}

type ExternalApiMethodsType = TransformServerToApiMethodsType<IExternalApiServerMethods>;
export type { IExternalApiServerMethods, ExternalApiMethodsType };
