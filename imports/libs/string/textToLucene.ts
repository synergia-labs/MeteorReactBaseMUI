import { hasValue } from "../hasValue";

export function textToLucene(text: string) {
	if (!hasValue(text)) return "*";
	const lucenePattern = text
		.split("")
		.map((_char, idx) => {
			let newText = text;
			if (idx > 0) {
				newText = text.substring(0, idx) + "?" + text.substring(idx + 1);
			}
			return newText + "*";
		})
		.join(" OR ");

	return lucenePattern;
}
