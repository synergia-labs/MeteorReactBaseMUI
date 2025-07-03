export function stringToBoolean(text?: string | boolean) {
	const trueValues = ["true", "sim", "yes", "1", "on", true];
	return trueValues.includes(text ?? false);
}
