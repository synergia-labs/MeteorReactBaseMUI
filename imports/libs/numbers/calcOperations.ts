export function divide(num: number, den: number, inf = 0) {
	if (den === 0) return inf;
	return num / den;
}

export function toAbsNonNegative(value: number) {
	return value < 0 ? 0 : value;
}
