import users from "/imports/modules/users/common/locales";
import security from "/imports/services/security/common/locales";
import templates from "../../app/templates/common/locales";
import externalApi from "/imports/services/externalApis/common/locales";

import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import universalLanguageDetect from "@unly/universal-language-detector";
import enumSupportedLanguages from "./common/enum/supportedLanguages";
import common from "./common/locales";
import deletedKeys from "./common/locales/deletedKeys.json";

const registerModules: Array<Record<enumSupportedLanguages, any>> = [users, common, security, templates, externalApi];
const fallbackLang = "pt";
const resources: Record<string, any> = { ...deletedKeys };

registerModules.forEach((module) => {
	Object.entries(module).forEach(([lang, value]) => {
		if (!resources[lang]) {
			resources[lang] = {};
		}

		// Adicionando namespaces
		Object.entries(value).forEach(([namespace, namespaceData]) => {
			if (!resources[lang][namespace]) {
				resources[lang][namespace] = {};
			}

			// Verificando se existe um sub-namespace e adicionando corretamente
			Object.entries(namespaceData as Record<string, any>).forEach(([subNamespace, subNamespaceData]) => {
				if (!resources[lang][namespace][subNamespace]) {
					resources[lang][namespace][subNamespace] = {};
				}
				resources[lang][namespace][subNamespace] = subNamespaceData;
			});
		});
	});
});

const detectedLanguage = universalLanguageDetect({
	supportedLanguages: Object.values(enumSupportedLanguages),
	fallbackLanguage: fallbackLang,
	acceptLanguageHeader: typeof window === "undefined" ? undefined : navigator.language,
	errorHandler: (error: any) => {
		console.error("Erro ao detectar idioma:", error);
	}
});

const options: InitOptions = {
	resources: resources,
	lng: detectedLanguage,
	fallbackLng: fallbackLang,
	debug: false,
	interpolation: { escapeValue: false }
};

i18n.use(initReactI18next).init(options);

export default i18n;
export { resources as i18nResources };
