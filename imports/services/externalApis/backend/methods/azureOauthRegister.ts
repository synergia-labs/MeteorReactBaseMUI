import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { ExternalApiServiceServerType } from "../server";
import { enumExternalApiServiceMethods } from "../../common/enums/methods";
import AzureOAuthRegisterParamType, { azureOAuthRegisterParamSchema } from "../../common/types/entra/oAuthRegister";
import { OAuth } from "meteor/oauth";
import { Configuration as SericeConfig, ServiceConfiguration } from "meteor/service-configuration";
import { z } from "zod";

class AzureRegisterOauth extends MethodBase<ExternalApiServiceServerType, AzureOAuthRegisterParamType, void> {
	constructor() {
		super({
			name: enumExternalApiServiceMethods.azureRegisterOauth,
			paramSch: azureOAuthRegisterParamSchema,
			canRegister: false
		});
	}

	private getEmailSchema = () => z.string().email();

	async action({ serviceName, oAuthVersion }: AzureOAuthRegisterParamType, _context: IContext): Promise<void> {
		OAuth.registerService(serviceName, oAuthVersion, null, async (query) => {
			const instance = this.getServerInstance();
			// Busca configuração do serviço
			const config: SericeConfig | undefined = await ServiceConfiguration.configurations.findOneAsync({
				service: serviceName
			});
			if (!config) this.generateError({ key: "serviceName" });

			// Obtém token de acesso usando código de autorização
			const accessToken = await instance.getEntraAccessToken({
				code: query.code,
				scopes: config?.scopes ?? ["user.read", "groupmember.read.all"]
			});

			if (!accessToken) this.generateError({ key: "" });

			// Obtém informações do usuário
			const identity = await instance.getAzureUserInfo({ accessToken: accessToken!.accessToken });
			if (!identity) this.generateError({ key: "" });

			// Valida e extrai email do usuário
			//@ts-ignore
			identity!.email =
				this.getEmailSchema().parse(identity!.userPrincipalName) || this.getEmailSchema().parse(identity!.mail);

			// Remove metadados da API
			//@ts-ignore
			delete identity["@odata.context"];

			// Retorna dados formatados para o sistema Meteor OAuth
			return {
				serviceData: Object.fromEntries(
					Object.entries(identity!).map(([key, value]) => [key, value === null ? undefined : value])
				),
				options: {
					accessToken: accessToken!.accessToken,
					expiresAt: accessToken?.expiresOn || undefined,
					profile: {
						id: identity!.id === null ? undefined : identity!.id,
						name: identity!.displayName === null ? undefined : identity!.displayName,
						// @ts-ignore
						email: identity!.email === null ? undefined : identity!.email
					}
				}
			};
		});
	}
}

export const azureRegisterOauth = new AzureRegisterOauth();
