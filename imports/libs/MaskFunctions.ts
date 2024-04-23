export const mascaraValorMonetario = (value: string): string => {
	let valor = value;

	valor = valor.replace(/\D/g, '');
	valor = (parseInt(valor) / 100).toFixed(2) + '';
	valor = valor.replace('.', ','); //troca o ponto pela vírgula dos centavos

	valor = valor.replace(/(\d)(\d{3})(\d{3})(\d{3}),/g, '$1.$2.$3.$4,');
	valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
	valor = valor.replace(/(\d)(\d{3}),/g, '$1.$2,');

	if (valor == 'NaN' || valor == '0,00') {
		return '';
	} else {
		return 'R$' + valor;
	}
};

export const mascaraPontoProporcional = (value: string): string => {
	let valor = value;

	valor = valor.replace(/\D/g, '');
	valor = (parseInt(valor) / 100).toFixed(2) + '';
	valor = valor.replace('.', ',');

	if (valor == 'NaN' || valor == '0,00' || valor.length > 6) {
		return ' ';
	} else {
		return valor;
	}
};

export const mascaraPontosFixos = (value: string | undefined): string => {
	if (!value) {
		return '';
	}
	let valor = value;

	valor = valor.replace(/\D/g, '');
	valor = valor.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1.');

	if (valor == 'NaN' || valor == '00' || valor == '0') {
		return '';
	} else {
		return valor;
	}
};

export const generalMask = (inputValue?: string, mask?: string): string => {
	if (!mask) return inputValue || '';

	let text: string = '';
	const data: string | undefined = inputValue;
	let c: string | undefined;

	let m: string | undefined;

	let i: number;

	let x: number;

	let valueCharCount: number = 0;
	for (i = 0, x = 1; x && i < (mask ? mask.length : 0); ++i) {
		c = data?.charAt(valueCharCount);
		m = mask.charAt(i);

		if (valueCharCount >= (data?.length || 0)) {
			break;
		}

		switch (mask.charAt(i)) {
			case '9': // Number
			case '#': // Number
				if (/\d/.test(c || '')) {
					text += c || '';
					valueCharCount++;
				} else {
					x = 0;
				}
				break;

			case '8': // Alphanumeric
			case 'A': // Alphanumeric
				if (/[a-z]/i.test(c || '')) {
					text += c || '';
					valueCharCount++;
				} else {
					x = 0;
				}
				break;

			case '7': // Number or Alphanumeric
			case 'N': // Number or Alphanumeric
				if (/[a-z0-9]/i.test(c || '')) {
					text += c || '';
					valueCharCount++;
				} else {
					x = 0;
				}
				break;

			case '6': // Any
			case 'X': // Any
				text += c || '';
				valueCharCount++;

				break;

			default:
				if (m === c) {
					text += m;
					valueCharCount++;
				} else {
					text += m;
				}

				break;
		}
	}
	return text;
};
