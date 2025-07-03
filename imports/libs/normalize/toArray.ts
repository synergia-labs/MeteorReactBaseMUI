import { hasValue } from "../hasValue";

/**
 * Normaliza um valor para um array de strings.
 *
 * @param value - O valor a ser normalizado, que pode ser uma string, um array de strings ou undefined.
 * @returns Um array de strings. Se o valor for undefined ou vazio, retorna um array vazio.
 *
 * @example
 * ```typescript
 * normalizeToArray("foo"); // ["foo"]
 * normalizeToArray(["foo", "bar"]); // ["foo", "bar"]
 * normalizeToArray(undefined); // []
 * ```
 */
function normalizeToArray(value: string | string[] | undefined): string[] {
	if (!hasValue(value)) return [];

	return Array.isArray(value) ? value : [value!];
}
export default normalizeToArray;
