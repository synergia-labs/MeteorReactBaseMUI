export const setInicioMaiusculo = (palavra: string | undefined) => {
	if (palavra) {
		return `${palavra[0].toUpperCase() + palavra.substring(1)}`;
	} else {
		return null;
	}
};
