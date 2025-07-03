import { Meteor } from "meteor/meteor";
import i18n from "../index";
import GenerateI18nErrorType from "../common/types/generateI18nErrorType";
import { hasValue } from "/imports/libs/hasValue";

const generateGenericError = (params?: string): Meteor.Error => new Meteor.Error("errors.generic", params, "common");

/**
 * Gera uma instância de `Meteor.Error` localizada.
 *
 * @param {GenerateI18nErrorType} errorData - Dados do erro, incluindo chave, parâmetros e namespace.
 * @returns {Meteor.Error} - Uma instância de `Meteor.Error` com os dados especificados.
 *
 * @remarks
 * Se a chave fornecida não existir no namespace especificado, uma mensagem de erro
 * será registrada no console.
 */
export const generateI18nError = ({
	key,
	params,
	namespace,
	origin,
	code = "500",
	error,
	context
}: GenerateI18nErrorType): Meteor.Error => {
	try {
		const stringifyParams = JSON.stringify({ ...(params && params), code: code, origin });
		if (!hasValue(namespace)) namespace = params?.apiName ?? context?.apiName ?? "common";

		if (hasValue(error)) {
			if (error instanceof Meteor.Error) return error;
			return generateGenericError(stringifyParams);
		}
		if (!i18n.exists(`errors.${key}`, { ns: namespace })) {
			if (i18n.exists(`errors.${key}`, { ns: "common" })) return generateGenericError(stringifyParams);
			return generateGenericError(stringifyParams);
		}

		return new Meteor.Error(`errors.${key}`, stringifyParams, namespace);
	} catch (e) {
		return generateGenericError(JSON.stringify({ code: "500", error: e }));
	}
};

export default generateI18nError;
