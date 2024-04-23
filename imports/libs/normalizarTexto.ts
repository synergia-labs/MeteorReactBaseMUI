export const normalizarTexto = (texto: string) => {
	return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const removerFormatacoes = (texto: string) => {
	return texto.replace(/\D/g, '');
};
