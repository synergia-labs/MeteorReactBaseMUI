import { i18n } from "i18next";

export function formatNumber(value: number, language: i18n["language"], fractionDigits: number = 1): string {
	return value.toLocaleString(language, {
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits
	});
}
