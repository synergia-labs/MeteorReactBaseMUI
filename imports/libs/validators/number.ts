/**
 * Valida se uma string representa um número válido.
 *
 * @param {string} value - String a ser validada.
 * @returns {boolean} Retorna `true` se a string representa um número, ou `false` caso contrário.
 */
const numberValidator = (value: string): boolean => {
	// Verifica se a string contém apenas dígitos (opcionalmente pode conter sinal e/ou ponto decimal)
	const numberRegex = /^-?\d+(\.\d+)?$/;
	return numberRegex.test(value.trim());
};

export default numberValidator;
