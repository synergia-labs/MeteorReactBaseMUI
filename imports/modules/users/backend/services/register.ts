import githubOAuth from "./github/githubOauth";
import googleOAuth from "./google/googleOauth";
import microsoftEntraOauth from "./microsoft/microsoftOauth";
import OAuthBase from "./oAuth.base";

/**
 * Array com as instâncias dos serviços de login externo.
 * Ao criar um novo serviço de login externo, adicione a instância aqui.
 * @type {Array<OAuthBase<any>>}
 */
export const externalLoginServicesInstances: Array<OAuthBase<any>> = [
	githubOAuth,
	googleOAuth,
	microsoftEntraOauth
] as const;

export const externalLoginServicesNames = externalLoginServicesInstances.map((service) => service.getServiceName());
