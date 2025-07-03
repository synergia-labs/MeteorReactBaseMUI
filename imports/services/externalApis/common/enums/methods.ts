import { enumExternalApiConfig } from "./config";

function getName(name: string) {
	return `${enumExternalApiConfig.API_NAME}.${name}`;
}

export const enumExternalApiServiceMethods = {
	getEntraAccessToken: getName("getEntraAccessToken"),
	getAzureCopmanyInfo: getName("getAzureCopmanyInfo"),
	getAzureUserInfo: getName("getAzureUserInfo"),
	getAzureUserPhoto: getName("getAzureUserPhoto"),
	azureRegisterOauth: getName("azureRegisterOauth"),
	validateAzureTenantId: getName("validateAzureTenantId"),
	getAzureUserList: getName("getAzureUserList"),
	getAzureGroupList: getName("getAzureGroupList"),
	getAzureGroupMembers: getName("getAzureGroupMembers")
};
