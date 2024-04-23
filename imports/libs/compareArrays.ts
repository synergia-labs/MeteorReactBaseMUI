/**
 * Função recursiva para comparar dois arrays.
 *
 * @param array1 O primeiro array a ser comparado.
 * @param array2 O segundo array a ser comparado.
 * @returns Retorna true se os arrays forem iguais, caso contrário retorna false.
 */
function compareArrays<T extends Record<string, any>>(array1: T[], array2: T[]): boolean {
	// Verifica se os arrays têm o mesmo comprimento
	if (array1.length !== array2.length) {
		return false;
	}

	// Itera sobre os elementos dos arrays
	for (let i = 0; i < array1.length; i++) {
		const item1 = array1[i];
		const item2 = array2[i];

		// Se ambos os itens forem arrays, chama recursivamente a função compareArrays
		if (Array.isArray(item1) && Array.isArray(item2)) {
			if (!compareArrays(item1, item2)) {
				return false;
			}
		}
		// Se ambos os itens forem objetos, compara-os profundamente
		else if (typeof item1 === 'object' && typeof item2 === 'object') {
			const keys1 = Object.keys(item1);
			const keys2 = Object.keys(item2);

			// Verifica se os objetos têm o mesmo número de chaves
			if (keys1.length !== keys2.length) {
				return false;
			}

			// Itera sobre as chaves do primeiro objeto
			for (const key of keys1) {
				// Verifica se a segunda chave existe no segundo objeto e se os valores correspondentes são iguais
				if (
					!item2.hasOwnProperty(key) ||
					(!Array.isArray(item1[key]) ? item1[key] !== item2[key] : !compareArrays(item1[key], item2[key]))
				) {
					return false;
				}
			}
		}
		// Se os itens não forem arrays ou objetos, compara-os diretamente
		else {
			if (item1 !== item2) {
				return false;
			}
		}
	}

	// Se nenhum elemento for diferente, os arrays são iguais
	return true;
}

export default compareArrays;
