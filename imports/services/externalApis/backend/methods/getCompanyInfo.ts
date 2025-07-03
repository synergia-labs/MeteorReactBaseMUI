import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { ExternalApiServiceServerType } from "../server";
import { enumExternalApiServiceMethods } from "../../common/enums/methods";
import { AuthenticationResult } from "@azure/msal-node";
import { getAzureCompanyInfoParamSchema, GetAzureCompanyInfoParamType } from "../../common/types/entra/companyInfo";
import { Organization as AzureOrganization } from "@microsoft/microsoft-graph-types";
import enumAzureBaseUrl from "../../common/enums/enumAzureBaseUrl";
import mountAzureUrl from "../../utils/mountAzureUrl";
import axios from "axios";

/**
 * Obtém informações detalhadas sobre a empresa/organização
 * @param tenantId - ID do inquilino Microsoft
 * @returns Promise com dados da organização
 * @throws Erro se tenantId não for fornecido ou operação falhar
 */
class GetAzureCompanyInfo extends MethodBase<
	ExternalApiServiceServerType,
	GetAzureCompanyInfoParamType,
	Partial<AzureOrganization> | undefined
> {
	constructor() {
		super({
			name: enumExternalApiServiceMethods.getAzureCopmanyInfo,
			paramSch: getAzureCompanyInfoParamSchema
		});
	}

	private getDefaultSelect(): Array<keyof AzureOrganization> {
		return [
			"id",
			"displayName",
			"verifiedDomains",
			"preferredLanguage",
			"countryLetterCode",
			"country",
			"city",
			"state",
			"street",
			"postalCode",
			"technicalNotificationMails",
			"businessPhones"
		];
	}

	async action(
		{ tenantId, select, accessToken }: GetAzureCompanyInfoParamType,
		_context: IContext
	): Promise<AuthenticationResult | undefined> {
		const accessTokenResult: string | undefined =
			accessToken ||
			(await this.getServerInstance()
				.getEntraAccessToken({
					tenantId,
					scopes: [enumAzureBaseUrl.GRAPH_DEFAULT_SCOPE]
				})
				.then((result?: AuthenticationResult) => result?.accessToken));

		if (!accessTokenResult) this.generateError({ key: "accessToken" });

		const url = mountAzureUrl<AzureOrganization>({
			baseUrl: enumAzureBaseUrl.GRAPH_ORGANIZATION_ENDPOINT,
			select: select || this.getDefaultSelect()
		});

		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${accessTokenResult}`,
				Accept: "application/json"
			}
		});

		if (response.status !== 200)
			this.generateError({
				key: "companyInfo",
				params: { error: response.statusText }
			});

		return response.data.value && response.data.value.length > 0 ? response.data.value[0] : undefined;
	}
}

export const getAzureCompanyInfo = new GetAzureCompanyInfo();
