import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { ExternalApiServiceServerType } from "../server";
import { enumExternalApiServiceMethods } from "../../common/enums/methods";
import { AuthenticationResult } from "@azure/msal-node";
import { Group as AzureGroup } from "@microsoft/microsoft-graph-types";
import enumAzureBaseUrl from "../../common/enums/enumAzureBaseUrl";
import mountAzureUrl from "../../utils/mountAzureUrl";
import axios from "axios";
import {
	getAzureGroupListParamSchema,
	GetAzureGroupListParamType,
	getAzureGroupListReturnSchema,
	GetAzureGroupListReturnType
} from "../../common/types/entra/groupList";

const hasSearchParam = (url: string) => {
	return url.includes("$search=");
};

class GetAzureGroupList extends MethodBase<
	ExternalApiServiceServerType,
	GetAzureGroupListParamType,
	GetAzureGroupListReturnType
> {
	constructor() {
		super({
			name: enumExternalApiServiceMethods.getAzureGroupList,
			paramSch: getAzureGroupListParamSchema,
			returnSch: getAzureGroupListReturnSchema
		});
	}

	private getDefaultSelect = (): Array<keyof AzureGroup | "*"> => ["displayName", "id"];

	async action(
		{
			tenantId,
			accessToken,
			select,
			count,
			top,
			nextLink,
			orderBy,
			includeTotalMembers,
			searchTerm
		}: GetAzureGroupListParamType,
		_context: IContext
	): Promise<GetAzureGroupListReturnType> {
		const accessTokenResult: string | undefined =
			accessToken ||
			(await this.getServerInstance()
				.getEntraAccessToken({
					tenantId,
					scopes: [enumAzureBaseUrl.GRAPH_DEFAULT_SCOPE]
				})
				.then((result?: AuthenticationResult) => result?.accessToken));

		if (!accessTokenResult) this.generateError({ key: "accessToken" });

		const url = mountAzureUrl<AzureGroup>({
			baseUrl: enumAzureBaseUrl.GRAPH_GROUPS_ENDPOINT,
			select: select || this.getDefaultSelect(),
			top: top,
			count: !!count,
			orderBy: orderBy,
			search: !!searchTerm ? `displayName:${searchTerm}` : undefined
		});

		const groupList = await axios.get(nextLink ?? url, {
			headers: {
				Authorization: `Bearer ${accessTokenResult}`,
				Accept: count ? "text/plain" : "application/json",
				...(hasSearchParam(nextLink ?? url) || !!count ? { ConsistencyLevel: "eventual" } : {})
			}
		});

		if (groupList.status !== 200) this.generateError({ key: "userInfo", params: { error: groupList.statusText } });

		if (!!count) return { total: parseInt(groupList.data) };

		const groups: GetAzureGroupListReturnType["groups"] = groupList.data.value;

		for (const group of groups || []) {
			if (!group.id) continue;
			group.totalMembers = await this.getServerInstance()
				.getAzureGroupMembers({
					groupId: group.id,
					accessToken: accessTokenResult,
					count: includeTotalMembers
				})
				.then((res) => res?.total);
		}
		return {
			groups: groups,
			nextLink: groupList.data["@odata.nextLink"] || undefined
		};
	}
}

export const getAzureGroupList = new GetAzureGroupList();
