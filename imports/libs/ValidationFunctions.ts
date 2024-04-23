export function validarURL(value: string | null, _label: string): string | true | null {
	const pattern =
		/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&amp;//=]*)/;
	if (value && !pattern.test(value) && value) {
		return true;
	}
	return null;
}

export function validarHora(value: string | null, _label: string): string | true | null {
	const pattern = /^([0-9]?[0-9]?[0-9]):[0-5][0-9]$/;
	if (value && !pattern.test(value) && value) {
		return true;
	}
	return null;
}
