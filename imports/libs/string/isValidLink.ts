/**
 * Verifica se uma string é um link válido (URL).
 *
 * @param str - A string a ser verificada.
 * @returns `true` se a string for uma URL válida, caso contrário `false`.
 */
function isValidLink(str: string): boolean {
	try {
		const url = new URL(str);

		// Garantir que o protocolo seja HTTP ou HTTPS
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}

export default isValidLink;
