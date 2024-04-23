export const validarCNPJ = (cnpj: string): boolean => {
	cnpj = cnpj.replace(/[^\d]+/g, '');

	if (cnpj === '') return false;

	if (cnpj.length !== 14) return false;

	// Elimina CNPJs inválidos conhecidos
	const cnpjInvalidosConhecidos = [
		'00000000000000',
		'11111111111111',
		'22222222222222',
		'33333333333333',
		'44444444444444',
		'55555555555555',
		'66666666666666',
		'77777777777777',
		'88888888888888',
		'99999999999999'
	];

	if (cnpjInvalidosConhecidos.includes(cnpj)) return false;

	// Valida Dígitos Verificadores (DVs)
	let tamanho = cnpj.length - 2;
	let numeros = cnpj.substring(0, tamanho);
	let digitos = cnpj.substring(tamanho);
	let soma = 0;
	let pos = tamanho - 7;

	for (let i = tamanho; i >= 1; i--) {
		soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
		if (pos < 2) pos = 9;
	}

	let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
	if (resultado !== parseInt(digitos.charAt(0))) return false;

	tamanho = tamanho + 1;
	numeros = cnpj.substring(0, tamanho);
	soma = 0;
	pos = tamanho - 7;

	for (let i = tamanho; i >= 1; i--) {
		soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
		if (pos < 2) pos = 9;
	}

	resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
	if (resultado !== parseInt(digitos.charAt(1))) return false;

	return true;
};
