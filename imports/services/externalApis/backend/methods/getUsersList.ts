import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { ExternalApiServiceServerType } from "../server";
import { enumExternalApiServiceMethods } from "../../common/enums/methods";
import { AuthenticationResult } from "@azure/msal-node";
import { User as AzureUser } from "@microsoft/microsoft-graph-types";
import enumAzureBaseUrl from "../../common/enums/enumAzureBaseUrl";
import mountAzureUrl from "../../utils/mountAzureUrl";
import axios from "axios";
import {
	getAzureUserListParamSchema,
	GetAzureUserListParamType,
	getAzureUserListReturnSchema,
	GetAzureUserListReturnType
} from "../../common/types/entra/userList";

class GetAzureUserList extends MethodBase<
	ExternalApiServiceServerType,
	GetAzureUserListParamType,
	GetAzureUserListReturnType
> {
	constructor() {
		super({
			name: enumExternalApiServiceMethods.getAzureUserList,
			paramSch: getAzureUserListParamSchema,
			returnSch: getAzureUserListReturnSchema
		});
	}

	private getDefaultSelect = (): Array<keyof AzureUser | "*"> => [
		"displayName",
		"id",
		"userPrincipalName",
		"givenName"
	];

	async action(
		{ tenantId, accessToken, select, count, top, nextLink }: GetAzureUserListParamType,
		_context: IContext
	): Promise<GetAzureUserListReturnType> {
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
			sufix: count ? `users/$count` : `users`,
			select: select || this.getDefaultSelect(),
			top: top
		});

		const userList = await axios.get(nextLink ?? url, {
			headers: {
				Authorization: `Bearer ${accessTokenResult}`,
				Accept: count ? "text/plain" : "application/json",
				...(!!count && { ConsistencyLevel: "eventual" })
			}
		});

		if (userList.status !== 200) this.generateError({ key: "userInfo", params: { error: userList.statusText } });

		if (!!count) return { total: parseInt(userList.data) };

		return {
			users: userList.data.value,
			nextLink: userList.data["@odata.nextLink"] || undefined
		};
	}
}

export const getAzureUserList = new GetAzureUserList();
