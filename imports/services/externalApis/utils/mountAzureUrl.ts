import enumAzureBaseUrl from "../common/enums/enumAzureBaseUrl";

interface IMountAzureUrlParams<T> {
	baseUrl: enumAzureBaseUrl;
	select?: Array<keyof T | "*">;
	filter?: string;
	search?: string;
	orderBy?: string;
	top?: number;
	skip?: number;
	expand?: Array<string>;
	sufix?: string;
	count?: boolean;
}

/**
 * Monta uma URL para consultas na API Microsoft Graph com os parâmetros de query adequados.
 *
 * @template T - Tipo genérico que representa a entidade, utilizado para validar as propriedades no `$select`.
 *
 * @param params - Objeto contendo as opções para construção da URL:
 * @param params.baseUrl - URL base da API Graph (por exemplo, `https://graph.microsoft.com/v1.0/users`).
 * @param params.select - (Opcional) Lista de campos a serem retornados, ou o caractere especial "*" para selecionar todos os campos.
 * @param params.filter - (Opcional) Expressão de filtro OData, utilizada no parâmetro `$filter`.
 * @param params.search - (Opcional) Termo de busca para o parâmetro `$search`. O valor será automaticamente colocado entre aspas.
 * @param params.orderBy - (Opcional) Campo utilizado para ordenação dos resultados, via `$orderby`.
 * @param params.top - (Opcional) Número máximo de registros a serem retornados, via `$top`.
 * @param params.skip - (Opcional) Número de registros a serem ignorados no resultado, usado em paginação (`$skip`).
 * @param params.expand - (Opcional) Lista de relações para expandir, utilizando `$expand`.
 * @param params.sufix - (Opcional) Sufixo a ser adicionado à URL, caso necessário.
 *
 * @returns A URL montada com os parâmetros de consulta apropriados para a API Microsoft Graph.
 *
 * @example
 * interface User {
 *   id: string;
 *   displayName: string;
 *   mail: string;
 * }
 *
 * const url = mountUrl<User>({
 *   baseUrl: "https://graph.microsoft.com/v1.0/users",
 *   select: ["*"],
 *   top: 10,
 *   search: "displayName:João"
 * });
 *
 * // Resultado:
 * // https://graph.microsoft.com/v1.0/users?$select=*&$search="displayName:João"&$top=10
 */
function mountAzureUrl<T>({
	baseUrl,
	select,
	filter,
	search,
	orderBy,
	top,
	skip,
	expand,
	sufix,
	count
}: IMountAzureUrlParams<T>): string {
	let url = baseUrl as unknown as string;

	// Adiciona sufixo se fornecido
	if (sufix) {
		if (!url.endsWith("/") && !sufix.startsWith("/")) url += "/";
		else if (url.endsWith("/") && sufix.startsWith("/")) sufix = sufix.substring(1);
		url += sufix;
	}
	if (count) url += `/$count`;

	// Construir a query string manualmente para evitar codificação
	const queryParams = [];

	if (select && select.length > 0) queryParams.push(`$select=${select.join(",")}`);
	if (filter) queryParams.push(`$filter=${filter}`);
	if (search) queryParams.push(`$search="${search}"`);
	if (orderBy) queryParams.push(`$orderby=${orderBy}`);
	if (top !== undefined) queryParams.push(`$top=${top}`);
	if (skip !== undefined) queryParams.push(`$skip=${skip}`);
	if (expand && expand.length > 0) queryParams.push(`$expand=${expand.join(",")}`);
	if (count) queryParams.push(`$count=true`);

	// Adicionar os parâmetros à URL
	if (queryParams.length > 0) {
		const separator = url.includes("?") ? "&" : "?";
		url += separator + queryParams.join("&");
	}

	return url;
}

export default mountAzureUrl;
export type { IMountAzureUrlParams };
