import { AuthenticationResult } from "@azure/msal-node";
import { Configuration as SericeConfig } from "meteor/service-configuration";
import { IMountMicrosoftUrlParams } from "../../utils/mountAzureUrl";
import { User as AzureUser } from "@microsoft/microsoft-graph-types";
import { Group as AzureGroup } from "@microsoft/microsoft-graph-types";
import { Organization as AzureOrganization } from "@microsoft/microsoft-graph-types";

/**
 * Interface principal para o serviço Entra que gerencia autenticação e interação com APIs Entra
 */
export interface IEntraServerInterface {
	/**
	 * Constrói uma URL com base nos parâmetros fornecidos.
	 *
	 * @template T - O tipo dos parâmetros usados para montar a URL.
	 * @param params - Os parâmetros necessários para construir a URL.
	 * @returns A URL construída como uma string.
	 */
	getUrl: <T>(params: IMountMicrosoftUrlParams<T>) => string;
	/**
	 * Registra o serviço OAuth da Entra no sistema Meteor
	 * @param serviceName - Nome do serviço a ser registrado
	 * @param oauthVersion - Versão do protocolo OAuth
	 */
	registerOauth: (serviceName: string, oauthVersion: number) => void;

	/**
	 * Obtém um token de acesso para interação com APIs Entra
	 * @param params - Parâmetros para obtenção do token
	 * @param params.code - Código de autorização (para fluxo de código)
	 * @param params.tenantId - ID do inquilino Entra (para fluxo de credenciais de cliente)
	 * @param params.serviceConfig - Configuração do serviço (opcional)
	 * @param params.scopes - Escopos de acesso solicitados (opcional)
	 * @returns Promise com resultado da autenticação ou null
	 */
	getAccessToken: (params: {
		code?: string;
		tenantId?: string;
		serviceConfig?: SericeConfig;
		scopes?: Array<string>;
	}) => Promise<AuthenticationResult | undefined>;

	/**
	 * Recupera informações do usuário autenticado
	 * @param accessToken - Token de acesso válido
	 * @returns Promise com dados do usuário
	 */
	getUserInfo: (accessToken: string) => Promise<AzureUser | undefined>;

	/**
	 * Obtém a foto de perfil do usuário
	 * @param accessToken - Token de acesso válido
	 * @param userId - ID do usuário (opcional, usa "me" por padrão)
	 * @returns Promise com buffer de dados da imagem ou null se não encontrada
	 */
	getUserPhoto: (accessToken: string, userId?: string) => Promise<Buffer<ArrayBuffer> | undefined>;

	/**
	 * Recupera grupos da empresa que correspondem ao termo de busca
	 * @param params - Parâmetros para busca de grupos
	 * @param params.accessToken - Token de acesso válido (opcional se tenantId fornecido)
	 * @param params.tenantId - ID do inquilino Entra (opcional se accessToken fornecido)
	 * @param params.searchTerm - Termo para filtrar grupos (opcional)
	 * @param params.url - URL completa para busca (opcional)
	 * @returns Promise com array de grupos encontrados
	 */
	getCompanyGroups: (params: {
		accessToken?: string;
		tenantId?: string;
		searchTerm?: string;
		url?: string;
	}) => Promise<Array<AzureGroup> | undefined>;

	/**
	 * Obtém informações detalhadas sobre a empresa/organização
	 * @param tenantId - ID do inquilino Entra
	 * @returns Promise com dados da organização
	 */
	getCompanyInfo: (tenantId: string, select: Array<keyof AzureOrganization>) => Promise<AzureOrganization | undefined>;
}

/**
 * Tipo de fábrica de métodos que cria funções para a classe EntraServer
 * @param instance - Instância do EntraServer para manter contexto
 * @returns Objeto parcial com métodos implementados
 */
export type EntraMethodsFactoryType = (instance: IEntraServerInterface) => Partial<IEntraServerInterface>;
