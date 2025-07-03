/**
 * Converte uma string de data para um objeto `Date`.
 * A função tenta parsear a string em diferentes formatos, priorizando o formato ISO 8601.
 * Se a conversão falhar, o comportamento de retorno pode ser configurado.
 *
 * @param dateStr A string de data a ser convertida.
 * @param withNull Um booleano que determina o comportamento de retorno em caso de falha na conversão.
 * - Se `true`, retorna `undefined` se a string não puder ser parseada.
 * - Se `false` (padrão), retorna a data e hora atuais se a string não puder ser parseada.
 * @returns Um objeto `Date` se a conversão for bem-sucedida, ou `undefined` (se `withNull` for `true`)
 * ou a data e hora atuais (se `withNull` for `false`) em caso de falha.
 *
 * @example
 * // Exemplo de uso com sucesso:
 * const date1 = parseStringToDate("2023-10-26T10:00:00Z");
 * console.log(date1); // Saída: Um objeto Date representando 26 de outubro de 2023, 10:00:00 UTC
 *
 * @example
 * // Exemplo de uso com falha e `withNull` como `false` (padrão):
 * const date2 = parseStringToDate("data invalida");
 * console.log(date2); // Saída: Um objeto Date representando a data e hora atuais
 *
 * @example
 * // Exemplo de uso com falha e `withNull` como `true`:
 * const date3 = parseStringToDate("outra string invalida", true);
 * console.log(date3); // Saída: undefined
 *
 * @example
 * // Exemplo de uso com string vazia e `withNull` como `false`:
 * const date4 = parseStringToDate("");
 * console.log(date4); // Saída: Um objeto Date representando a data e hora atuais
 */
export function parseStringToDate(dateStr: string, withNull = false): Date | undefined {
	// Verifica se a string de data é nula, indefinida ou não é uma string.
	// Se for, retorna undefined se withNull for true, ou a data atual se withNull for false.
	if (!dateStr || typeof dateStr !== "string") {
		return withNull ? undefined : new Date();
	}

	// Tentativa 1: Formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ ou variantes)
	// O construtor Date do JavaScript é robusto para parsear strings ISO 8601.
	const isoDate = new Date(dateStr);

	// Verifica se a data parseada é válida.
	// isNaN(isoDate.getTime()) é a forma mais confiável de verificar a validade de um objeto Date.
	if (!isNaN(isoDate.getTime())) {
		return isoDate;
	}

	// Se nenhuma das tentativas de conversão for bem-sucedida,
	// retorna undefined se withNull for true, ou a data atual se withNull for false.
	return withNull ? undefined : new Date();
}
