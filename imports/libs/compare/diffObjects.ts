/**
 * Compara dois objetos e identifica diferenças entre eles (valores alterados, adicionados e removidos).
 *
 * @typeParam BaseType - Tipo do objeto base de referência
 * @typeParam CompareType - Tipo do objeto a ser comparado com a base
 *
 * @param baseObject - Objeto base de referência para comparação
 * @param compareObject - Objeto a ser comparado com a base
 * @param relativePath - Caminho relativo opcional para identificação de propriedades aninhadas
 *
 * @returns Um objeto contendo arrays de valores alterados, adicionados e removidos
 *
 * @example
 * ```typescript
 * const base = { name: "João", age: 30, address: { city: "São Paulo" } };
 * const compare = { name: "João", age: 31, address: { city: "Rio" } };
 * const diff = diffObjects(base, compare);
 * // Resultado:
 * // {
 * //   changedValues: [
 * //     { key: "age", valueBase: 30, valueCompare: 31 },
 * //     { key: "address.city", valueBase: "São Paulo", valueCompare: "Rio" }
 * //   ],
 * //   addedValues: [],
 * //   removedValues: []
 * // }
 * ```
 */

function diffObjects<BaseType extends Record<string, any>, CompareType extends Record<string, any>>(
	baseObject: BaseType,
	compareObject: CompareType,
	relativePath?: string
): {
	changedValues: Array<{ key: string; valueBase: any; valueCompare: any }>;
	addedValues: Array<{ key: string; value: any }>;
	removedValues: Array<{ key: string; value: any }>;
	hasChanges: boolean;
	totalChanges: number;
} {
	const changedValues: Array<{ key: string; valueBase: any; valueCompare: any }> = [];
	const addedValues: Array<{ key: string; value: any }> = [];
	const removedValues: Array<{ key: string; value: any }> = [];

	const generateKeyPath = (key: string): string => (relativePath ? `${relativePath}.${key}` : key);

	// Verifica propriedades removidas e alteradas
	for (const key in baseObject) {
		const keyPath = generateKeyPath(key);

		// Verifica se a propriedade existe no objeto de comparação
		if (!(key in compareObject)) {
			removedValues.push({ key: keyPath, value: baseObject[key] });
			continue;
		}

		const baseValue = baseObject[key];
		const compareValue = compareObject[key];

		// Comparação recursiva para objetos aninhados (exceto arrays e null)
		if (
			baseValue !== null &&
			compareValue !== null &&
			typeof baseValue === "object" &&
			typeof compareValue === "object" &&
			!Array.isArray(baseValue) &&
			!Array.isArray(compareValue)
		) {
			const nestedDiff = diffObjects(baseValue, compareValue, keyPath);

			changedValues.push(...nestedDiff.changedValues);
			addedValues.push(...nestedDiff.addedValues);
			removedValues.push(...nestedDiff.removedValues);
		}
		// Comparação direta para tipos primitivos ou quando um é objeto e outro não
		else if (!Object.is(baseValue, compareValue))
			changedValues.push({
				key: keyPath,
				valueBase: baseValue,
				valueCompare: compareValue
			});
	}

	for (const key in compareObject)
		if (!(key in baseObject))
			if (typeof compareObject[key] === "object" && compareObject[key] !== null && !Array.isArray(compareObject[key]))
				addedValues.push(...convertObjectInSingleKey(compareObject[key], generateKeyPath(key)));
			else
				addedValues.push({
					key: generateKeyPath(key),
					value: compareObject[key]
				});

	return {
		changedValues,
		addedValues,
		removedValues,
		hasChanges: !!changedValues.length || !!addedValues.length || !!removedValues.length,
		totalChanges: changedValues.length + addedValues.length + removedValues.length
	};
}

function convertObjectInSingleKey(
	object: Record<string, any>,
	relativePath?: string
): Array<{ key: string; value: any }> {
	const convertedValues: Array<{ key: string; value: any }> = [];

	for (const key in object) {
		const keyPath = relativePath ? `${relativePath}.${key}` : key;

		if (typeof object[key] === "object" && object[key] !== null && !Array.isArray(object[key])) {
			convertedValues.push(...convertObjectInSingleKey(object[key], keyPath));
		} else {
			convertedValues.push({ key: keyPath, value: object[key] });
		}
	}

	return convertedValues;
}

export default diffObjects;
