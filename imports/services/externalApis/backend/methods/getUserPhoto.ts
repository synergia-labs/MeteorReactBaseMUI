import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { ExternalApiServiceServerType } from "../server";
import { enumExternalApiServiceMethods } from "../../common/enums/methods";
import { AuthenticationResult } from "@azure/msal-node";
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
class GetAzureUserPhoto extends MethodBase<
	ExternalApiServiceServerType,
	Omit<GetAzureUserInfoParamType, "select">,
	Buffer<ArrayBuffer> | undefined
> {
	constructor() {
		super({
			name: enumExternalApiServiceMethods.getAzureUserPhoto,
			paramSch: getAzureUserInfoParamSchema.omit({ select: true })
		});
	}

	async action(
		{ tenantId, userId, accessToken }: Omit<GetAzureUserInfoParamType, "select">,
		_context: IContext
	): Promise<Buffer<ArrayBuffer> | undefined> {
		try {
			const accessTokenResult: string | undefined =
				accessToken ||
				(await this.getServerInstance()
					.getEntraAccessToken({
						tenantId,
						scopes: [enumAzureBaseUrl.GRAPH_DEFAULT_SCOPE]
					})
					.then((result?: AuthenticationResult) => result?.accessToken));

			if (!accessTokenResult) this.generateError({ key: "accessToken" });

			const url = mountAzureUrl({
				baseUrl: enumAzureBaseUrl.IDENTIFY_URL,
				sufix: userId ? `users/${userId}/photo/$value` : "me/photo/$value"
			});

			const userPhoto = await axios.get(url, {
				headers: {
					"Authorization": `Bearer ${accessTokenResult}`,
					"Content-Type": "image/jpeg"
				},
				responseType: "arraybuffer"
			});

			if (userPhoto.status !== 200) this.generateError({ key: "userInfo", params: { error: userPhoto.statusText } });

			return Buffer.from(userPhoto.data, "binary");
		} catch (error) {
			return undefined;
		}
	}
}

export const getAzureUserPhoto = new GetAzureUserPhoto();
