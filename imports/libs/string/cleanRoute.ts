/**
 * Remove parâmetros dinâmicos e strings de consulta de uma rota fornecida,
 * retornando apenas a rota estática composta por segmentos fixos e barras.
 *
 * Suporta a remoção de:
 * - Parâmetros no estilo Express (ex: `:id`)
 * - Parâmetros no estilo Next.js (ex: `[id]`)
 * - Query strings (ex: `?chave=valor`)
 *
 * @param route - A string da rota a ser limpa.
 * @returns Uma versão limpa da rota contendo apenas segmentos estáticos.
 *
 * @example
 * ```ts
 * cleanRoute("/usuarios/:id/perfil"); // Retorna "/usuarios/perfil"
 * cleanRoute("/produtos/[produtoId]?q=123"); // Retorna "/produtos"
 * cleanRoute("/blog/:categoria/:slug"); // Retorna "/blog"
 * ```
 */
function cleanRoute(route?: string): string {
	if (!route) return "";

	// Remove a query string
	const withoutQuery = route.split("?")[0];

	// Remove os segmentos dinâmicos
	const cleanedSegments = withoutQuery
		.split("/")
		.filter((segment) => segment && !segment.startsWith(":") && !segment.startsWith("[") && !segment.endsWith("]"));

	return "/" + cleanedSegments.join("/");
}

export default cleanRoute;
