/**
 * Validates whether a given string is a valid VarName.
 *
 * A valid VarName must:
 * - Start with a letter (a-z, A-Z) or an underscore (_).
 * - Be followed by zero or more alphanumeric characters (a-z, A-Z, 0-9) or underscores (_).
 *
 * @param identificador - The string to validate as an VarName.
 * @returns `true` if the string is a valid VarName, otherwise `false`.
 */
export function isValidVarName(identificador: string) {
	const validVarNameRegex = /\b[a-zA-Z_]\w*\b/g;
	return validVarNameRegex.test(identificador);
}
