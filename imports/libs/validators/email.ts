/**
 * Método para validação de e-mail
 *
 * @param {string} email - E-mail a ser validado
 * @returns {boolean}     - Retorna true se o e-mail for válido, false caso contrário
 */

const emailValidator = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export default emailValidator;
