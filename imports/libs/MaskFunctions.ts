export const mascaraValorMonetario = (value: string): string => {
	let valor = value;

	valor = valor.replace(/\D/g, "");
	valor = (parseInt(valor) / 100).toFixed(2) + "";
	valor = valor.replace(".", ","); //troca o ponto pela vírgula dos centavos

	valor = valor.replace(/(\d)(\d{3})(\d{3})(\d{3}),/g, "$1.$2.$3.$4,");
	valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
	valor = valor.replace(/(\d)(\d{3}),/g, "$1.$2,");

	if (valor == "NaN" || valor == "0,00") {
		return "";
	} else {
		return "R$" + valor;
	}
};

export const mascaraPontoProporcional = (value: string): string => {
	let valor = value;

	valor = valor.replace(/\D/g, "");
	valor = (parseInt(valor) / 100).toFixed(2) + "";
	valor = valor.replace(".", ",");

	if (valor == "NaN" || valor == "0,00" || valor.length > 6) {
		return " ";
	} else {
		return valor;
	}
};

export const mascaraPontosFixos = (value: string | undefined): string => {
	if (!value) {
		return "";
	}
	let valor = value;

	valor = valor.replace(/\D/g, "");
	valor = valor.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1.");

	if (valor == "NaN" || valor == "00" || valor == "0") {
		return "";
	} else {
		return valor;
	}
};

export const generalMask = (inputValue?: string, mask?: string): string => {
	// Se não houver máscara, retorna o valor de entrada original
	if (!mask) return inputValue || "";
	if (!inputValue) return "";

	let result = "";
	let valueIndex = 0;

	// Itera por cada caractere da máscara
	for (let i = 0; i < mask.length; i++) {
		// Se já percorremos todos os caracteres do valor de entrada, mas a máscara tem mais caracteres fixos,
		// continuamos adicionando os caracteres fixos da máscara
		if (valueIndex >= inputValue.length) {
			// Verifica se o caractere atual da máscara é um caractere fixo (não um símbolo de substituição)
			const maskChar = mask.charAt(i);
			if (!["#", "9", "A", "8", "N", "7", "X", "6"].includes(maskChar)) {
				result += maskChar;
			}
			continue;
		}

		const currentChar = inputValue.charAt(valueIndex);
		const maskChar = mask.charAt(i);

		switch (maskChar) {
			// Dígitos
			case "#":
			case "9":
				if (/\d/.test(currentChar)) {
					result += currentChar;
					valueIndex++;
				}
				break;

			// Letras
			case "A":
			case "8":
				if (/[a-z]/i.test(currentChar)) {
					result += currentChar;
					valueIndex++;
				}
				break;

			// Alfanuméricos
			case "N":
			case "7":
				if (/[a-z0-9]/i.test(currentChar)) {
					result += currentChar;
					valueIndex++;
				}
				break;

			// Qualquer caractere
			case "X":
			case "6":
				result += currentChar;
				valueIndex++;
				break;

			// Caracteres fixos da máscara
			default:
				result += maskChar;
				// Só avança no valor de entrada se o caractere atual corresponder ao caractere da máscara
				if (currentChar === maskChar) {
					valueIndex++;
				}
				break;
		}
	}

	return result;
};
