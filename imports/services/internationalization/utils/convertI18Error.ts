/**
 * Módulo para conversão de erros em um formato internacionalizado.
 *
 * @module convertI18Error
 */

import i18nImported from "..";
import I18nErrorType from "../common/types/i18nError";
import { TFunction } from "i18next";

/**
 * Converte um erro desconhecido em um erro no formato internacionalizado.
 *
 * @param error - Erro desconhecido que pode ser um erro do Meteor ou outro tipo de erro.
 * @returns Um objeto do tipo `I18nErrorType` contendo um título e, opcionalmente, uma mensagem.
 */
const convertI18Error = (error: unknown, _t?: TFunction): I18nErrorType => {
	const t = _t || i18nImported.t;

	const defaultError: I18nErrorType = {
		title: t("errors.generic.title", { ns: "common" }),
		message: t("common:errors.generic.message")
	};

	if (error instanceof Meteor.Error) {
		const { error: key, reason, details } = error;
		if (!i18nImported.exists(key.toString(), { ns: details ?? "common" })) {
			console.error(`Chave "${key}" não encontrada no namespace "${details ?? "common"}"`);
			return defaultError;
		}
		return {
			title: t(`${key.toString()}.title`, { ns: details ?? "common" }),
			message: t(`${key.toString()}.message`, {
				ns: details ?? "common",
				...(reason && JSON.parse(reason))
			}) as string
		};
	}
	return defaultError;
};

export default convertI18Error;
