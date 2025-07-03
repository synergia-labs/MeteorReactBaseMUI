import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { ExternalApiServiceServerType } from "../server";
import { enumExternalApiServiceMethods } from "../../common/enums/methods";
import { AuthenticationResult } from "@azure/msal-node";
import { User as AzureUser } from "@microsoft/microsoft-graph-types";
import { getAzureUserInfoParamSchema, GetAzureUserInfoParamType } from "../../common/types/entra/userInfo";
import enumAzureBaseUrl from "../../common/enums/enumAzureBaseUrl";
import mountAzureUrl from "../../utils/mountAzureUrl";
import axios from "axios";

/**
 * Obtém informações detalhadas sobre a empresa/organização
 * @param tenantId - ID do inquilino Microsoft
 * @returns Promise com dados da organização
 * @throws Erro se tenantId não for fornecido ou operação falhar
 */
class GetAzureUserInfo extends MethodBase<
	ExternalApiServiceServerType,
	GetAzureUserInfoParamType,
	Partial<AzureUser> | undefined
> {
	constructor() {
		super({
			name: enumExternalApiServiceMethods.getAzureUserInfo,
			paramSch: getAzureUserInfoParamSchema
		});
	}

	private getDefaultSelect(): Array<keyof AzureUser | "*"> {
		return ["*", "onPremisesExtensionAttributes"];
	}

	async action(
		{ tenantId, userId, accessToken, select }: GetAzureUserInfoParamType,
		_context: IContext
	): Promise<Partial<AzureUser> | undefined> {
		const accessTokenResult: string | undefined =
			accessToken ||
			(await this.getServerInstance()
				.getEntraAccessToken({
					tenantId,
					scopes: [enumAzureBaseUrl.GRAPH_DEFAULT_SCOPE]
				})
				.then((result?: AuthenticationResult) => result?.accessToken));

		if (!accessTokenResult) this.generateError({ key: "accessToken" });

		const url = mountAzureUrl<AzureUser>({
			baseUrl: enumAzureBaseUrl.IDENTIFY_URL,
			sufix: userId ? `users/${userId}` : "me",
			select: select || this.getDefaultSelect()
		});

		const userInfo = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${accessTokenResult}`,
				Accept: "application/json"
			}
		});

		if (userInfo.status !== 200) this.generateError({ key: "userInfo", params: { error: userInfo.statusText } });

		return userInfo.data;
	}
}

export const getAzureUserInfo = new GetAzureUserInfo();
