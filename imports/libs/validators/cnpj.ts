/**
 * Valida se um CNPJ (Cadastro Nacional da Pessoa Jurídica) é válido.
 *
 * @param {string} cnpj - Número do CNPJ a ser validado (com ou sem formatação).
 * @returns {boolean} Retorna `true` se o CNPJ for válido, ou `false` se for inválido.
 */
const cnpjValidator = (cnpj: string): boolean => {
	const sanitizeCnpj = (value: string): string => value.replace(/[^\d]+/g, "");

	const isBlacklisted = (value: string): boolean => {
		const blacklist = new Set([
			"00000000000000",
			"11111111111111",
			"22222222222222",
			"33333333333333",
			"44444444444444",
			"55555555555555",
			"66666666666666",
			"77777777777777",
			"88888888888888",
			"99999999999999"
		]);
		return blacklist.has(value);
	};

	const calculateCheckDigit = (numbers: string): number => {
		let sum = 0;
		let weight = numbers.length - 7;

		for (const digit of numbers) {
			sum += parseInt(digit, 10) * weight--;
			if (weight < 2) weight = 9;
		}

		const remainder = sum % 11;
		return remainder < 2 ? 0 : 11 - remainder;
	};

	const cleanedCnpj = sanitizeCnpj(cnpj);
	if (cleanedCnpj.length !== 14 || isBlacklisted(cleanedCnpj)) return false;

	const baseCnpj = cleanedCnpj.slice(0, 12);
	const firstCheckDigit = calculateCheckDigit(baseCnpj);
	const secondCheckDigit = calculateCheckDigit(baseCnpj + firstCheckDigit);

	const actualCheckDigits = cleanedCnpj.slice(12);
	const calculatedCheckDigits = `${firstCheckDigit}${secondCheckDigit}`;

	return actualCheckDigits === calculatedCheckDigits;
};

export default cnpjValidator;
