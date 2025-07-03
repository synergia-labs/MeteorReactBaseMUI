import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { ExternalApiServiceServerType } from "../server";
import { enumExternalApiServiceMethods } from "../../common/enums/methods";
import { z } from "zod";
import ValidateTenantIdReturnType from "../../common/types/entra/validateTenantId";
import { hasValue } from "/imports/libs/hasValue";

/**
 * Obtém informações detalhadas sobre a empresa/organização
 * @param tenantId - ID do inquilino Microsoft
 * @returns Promise com dados da organização
 * @throws Erro se tenantId não for fornecido ou operação falhar
 */
class ValidateAzureTenantId extends MethodBase<ExternalApiServiceServerType, string, ValidateTenantIdReturnType> {
	constructor() {
		super({
			name: enumExternalApiServiceMethods.validateAzureTenantId,
			paramSch: z.string()
		});
	}

	async action(tenantId: string, _context: IContext): Promise<ValidateTenantIdReturnType> {
		const accessToken: string | undefined = await this.getServerInstance()
			.getEntraAccessToken({ tenantId: tenantId })
			.then((res) => res?.accessToken);

		if (!accessToken) this.generateError({ key: "tenantIdNotFound" });

		const companyInfo = await this.getServerInstance()
			.getAzureCopmanyInfo({ accessToken: accessToken! })
			.then((res) => ({
				displayName: res?.displayName ?? undefined,
				validDomainNames: res?.verifiedDomains?.map((domain) => domain.name).join(",") ?? undefined
			}));

		const userListTotal = await this.getServerInstance()
			.getAzureUserList({ accessToken: accessToken!, count: true })
			.then((res) => res?.total);

		const groupListTotal = await this.getServerInstance()
			.getAzureGroupList({ accessToken: accessToken!, count: true })
			.then((res) => res?.total);

		return {
			isValid: hasValue(accessToken),
			companyName: companyInfo?.displayName,
			validDomainNames: companyInfo?.validDomainNames,
			totalUsers: userListTotal,
			totalGroups: groupListTotal
		};
	}
}

export const validateAzureTenantId = new ValidateAzureTenantId();
