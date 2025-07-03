import enumSupportedLanguages from "../common/enum/supportedLanguages";
import { TranslateItemPropsType } from "../frontend/components/translateItem/translateItem.view";

/**
 * Converte um objeto aninhado em um objeto com chaves únicas representando caminhos
 * @param object - Objeto a ser convertido
 * @param path - Caminho atual para uso na recursão
 * @returns Objeto plano com chaves representando os caminhos completos
 */
const convertObjectToSingleKeyObject = (object?: Record<string, unknown>, path?: string): Record<string, string> => {
	if (!object) return {};

	const result: Record<string, string> = {};

	for (const [key, value] of Object.entries(object)) {
		const currentPath = path ? `${path}.${key}` : key;

		if (typeof value === "string") {
			result[currentPath] = value;
		} else if (value && typeof value === "object") {
			Object.assign(result, convertObjectToSingleKeyObject(value as Record<string, unknown>, currentPath));
		}
	}

	return result;
};

/**
 * Gera uma lista de itens de tradução baseado nos recursos de internacionalização
 * @param i18nResources - Recursos de internacionalização organizados por idioma
 * @param absolutePath - Caminho absoluto para acessar as traduções nos recursos
 * @param relativePath - Caminho relativo opcional para acessar subchaves
 * @param sourceLanguage - Idioma de origem para listar as chaves disponíveis (padrão: PT)
 * @returns Array de itens de tradução formatados para uso no componente TranslateItem
 * @throws {Meteor.Error} Se um idioma suportado não for encontrado nos recursos
 */
function getTranslateItemList(
	i18nResources: Record<string, unknown>,
	absolutePath: string,
	relativePath?: string,
	sourceLanguage: enumSupportedLanguages = enumSupportedLanguages.PT
): Array<TranslateItemPropsType> {
	try {
		// Obter o caminho completo como um array de chaves
		const pathKeys = relativePath ? [...absolutePath.split("."), ...relativePath.split(".")] : absolutePath.split(".");

		const relativeObjects: Record<enumSupportedLanguages, Record<string, unknown>> = {} as Record<
			enumSupportedLanguages,
			Record<string, unknown>
		>;

		for (const lang of Object.values(enumSupportedLanguages)) {
			if (!i18nResources[lang])
				throw new Meteor.Error("Language not found", `Language ${lang} not found in the provided object`);

			let currentValue = i18nResources[lang] as Record<string, unknown>;
			// Navegar pelo caminho para encontrar o objeto de destino
			let pathValid = true;
			for (const key of pathKeys) {
				if (currentValue[key] === undefined) {
					pathValid = false;
					break;
				}
				currentValue = currentValue[key] as Record<string, unknown>;
			}

			relativeObjects[lang] = pathValid ? currentValue : {};
		}

		// Converter objetos aninhados para objetos planos para cada idioma
		const flattenedObjects: Record<enumSupportedLanguages, Record<string, string>> = {} as Record<
			enumSupportedLanguages,
			Record<string, string>
		>;

		for (const lang of Object.values(enumSupportedLanguages))
			flattenedObjects[lang] = convertObjectToSingleKeyObject(relativeObjects[lang]);

		// Criar a lista de itens de tradução baseada nas chaves do idioma fonte
		const sourceKeys = Object.keys(flattenedObjects[sourceLanguage]);

		const result = sourceKeys.map((key) => {
			const translations: Partial<Record<enumSupportedLanguages, string>> = {};

			for (const lang of Object.values(enumSupportedLanguages)) translations[lang] = flattenedObjects[lang][key] || "";

			return {
				label: key,
				...translations
			} as TranslateItemPropsType;
		});

		return result;
	} catch (e) {
		return [];
	}
}

export default getTranslateItemList;
