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
	getAzureGroupMembersListParamSchema,
	GetAzureGroupMembersListParamType,
	getAzureGroupMembersListReturnSchema,
	GetAzureGroupMembersListReturnType
} from "../../common/types/entra/groupMemberList";

class GetAzureGroupMembers extends MethodBase<
	ExternalApiServiceServerType,
	GetAzureGroupMembersListParamType,
	GetAzureGroupMembersListReturnType
> {
	constructor() {
		super({
			name: enumExternalApiServiceMethods.getAzureGroupMembers,
			paramSch: getAzureGroupMembersListParamSchema,
			returnSch: getAzureGroupMembersListReturnSchema
		});
	}

	private getDefaultSelect = (): Array<keyof AzureUser | "*"> => [
		"displayName",
		"id",
		"mail",
		"userPrincipalName",
		"businessPhones"
	];

	async action(
		{ tenantId, accessToken, select, count, top, nextLink, groupId, includePhoto }: GetAzureGroupMembersListParamType,
		_context: IContext
	): Promise<GetAzureGroupMembersListReturnType> {
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
			baseUrl: enumAzureBaseUrl.GRAPH_GROUPS_ENDPOINT,
			sufix: `/${groupId}/members`,
			count: !!count,
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

		const users: Array<Partial<AzureUser & { photo?: Buffer<ArrayBuffer> | undefined }>> = userList.data.value;

		if (includePhoto)
			for (const user of users)
				user.photo = await this.getServerInstance().getAzureUserPhoto({
					accessToken: accessTokenResult,
					userId: user.id
				});

		return {
			users: users,
			nextLink: userList.data["@odata.nextLink"] || undefined
		};
	}
}

export const getAzureGroupMembers = new GetAzureGroupMembers();
