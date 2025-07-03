export function textToRegex(text: string, limit: number = 1): RegExp {
	if (!!!text) return new RegExp("", "i");
	const regexPattern = text.split("").join(`.{0,${limit}}`);
	return new RegExp(regexPattern, "i");
}
