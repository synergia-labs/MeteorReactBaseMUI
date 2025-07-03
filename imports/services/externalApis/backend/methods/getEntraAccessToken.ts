import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import GetEntraAccessTokenType, { getAccessTokenSchema } from "../../common/types/entra/acessToken";
import { ServiceConfiguration } from "meteor/service-configuration";
import { ExternalApiServiceServerType } from "../server";
import { enumExternalApiServiceMethods } from "../../common/enums/methods";
import { AuthenticationResult, ConfidentialClientApplication, Configuration } from "@azure/msal-node";
import { OAuth } from "meteor/oauth";
import { hasValue } from "/imports/libs/hasValue";
import enumAzureBaseUrl from "../../common/enums/enumAzureBaseUrl";
import mountAzureUrl from "../../utils/mountAzureUrl";

/**
 * Obtém um token de acesso para interação com APIs Entra
 * @param code - Código de autorização (para fluxo de código)
 * @param tenantId - ID do inquilino Entra (para fluxo de credenciais de cliente)
 * @param serviceConfig - Configuração do serviço (opcional)
 * @param scopes - Escopos de acesso solicitados (opcional)
 * @returns Promise com resultado da autenticação ou null
 * @throws Erro se parâmetros necessários estiverem faltando
 */
class GetEntraAccessToken extends MethodBase<
	ExternalApiServiceServerType,
	GetEntraAccessTokenType,
	AuthenticationResult | undefined
> {
	constructor() {
		super({
			name: enumExternalApiServiceMethods.getEntraAccessToken,
			paramSch: getAccessTokenSchema,
			canRegister: false
		});
	}

	async action(
		{ code, tenantId, serviceConfig, scopes }: GetEntraAccessTokenType,
		_context: IContext
	): Promise<AuthenticationResult | undefined> {
		// Verifica se pelo menos um dos parâmetros necessários está presente
		if (!code && !tenantId)
			this.generateError({
				key: "common:errors.missingParameters",
				params: { missingParameters: "code, tanantId" }
			});
		// Busca configuração do serviço se não fornecida
		serviceConfig =
			serviceConfig ??
			(await ServiceConfiguration.configurations.findOneAsync({
				service: Meteor.settings.auth.microsoft.serviceName
			}));

		// Valida configuração do serviço
		if (!hasValue(serviceConfig))
			this.generateError({ key: "common:errors.missingParameters", params: { missingParameters: "serviceConfig" } });
		if (!hasValue(serviceConfig?.clientId))
			this.generateError({ key: "common:errors.missingParameters", params: { missingParameters: "clientId" } });
		if (!hasValue(serviceConfig?.secret))
			this.generateError({ key: "common:errors.missingParameters", params: { missingParameters: "clientSecret" } });

		// Cria configuração para biblioteca MSAL
		const config: Configuration = {
			auth: {
				clientId: serviceConfig!.clientId,
				authority: mountAzureUrl({ baseUrl: enumAzureBaseUrl.ACCESS_TOKEN, sufix: tenantId || "common" }),
				clientSecret: serviceConfig!.secret
			}
		};

		// Inicializa cliente confidencial
		const cca = new ConfidentialClientApplication(config);

		// Obtém token pelo fluxo adequado conforme parâmetros disponíveis
		return code
			? await cca.acquireTokenByCode({
					code: code,
					redirectUri: OAuth._redirectUri(Meteor.settings.auth.microsoft.serviceName, serviceConfig!),
					scopes: scopes || serviceConfig!.scopes || []
				})
			: (await cca.acquireTokenByClientCredential({
					scopes: scopes || [enumAzureBaseUrl.GRAPH_DEFAULT_SCOPE]
				})) || undefined;
	}
}

export const getEntraAccessToken = new GetEntraAccessToken();
