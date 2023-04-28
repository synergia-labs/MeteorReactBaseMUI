/**
 * Format numbers like 1,000 to 1k and 1,000,000 to 1m
 * @param numero
 * @returns
 */
export const abreviarNumero = (numero: number): string => {
	if (!numero) return '0';
	const intlFormat = (num: number) => {
		return new Intl.NumberFormat().format(Math.floor(num * 10) / 10);
	};

	const makeFriendly = (num: number) => {
		if (num >= 1000000) return intlFormat(num / 1000000) + 'M';
		if (num >= 1000) return intlFormat(num / 1000) + 'k';
		return intlFormat(num);
	};

	let numeroAbreviado = makeFriendly(numero);

	return numeroAbreviado.replace(',', '.');
};
