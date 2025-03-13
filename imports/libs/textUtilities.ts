export const textNormalize = (text: string) => {
	return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const textNoFormatting = (text: string) => {
	return text.replace(/\D/g, '');
};
