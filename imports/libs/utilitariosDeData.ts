export const converterDataParaFiltroDoMongo = (data: Date | string, inicio: boolean = true) => {
	const dataConvertida = new Date(data);
	dataConvertida.setDate(dataConvertida.getDate());
	inicio ? dataConvertida.setHours(0, 0, 0) : dataConvertida.setHours(23, 59, 59);
	return dataConvertida;
};

// Define os campos de hora na data comparações usando dateTime.
export const definirCamposDeHoraNaData = (data: Date | string | null, inicioDia = true): Date | null => {
	if (!data) {
		return null;
	}
	const dataFormatada = new Date(data);
	inicioDia ? dataFormatada.setHours(0, 0, 0, 0) : dataFormatada.setHours(23, 59, 59, 999);
	return dataFormatada;
};

export function incrementarDias(data: Date, numeroDias: number) {
	const dataExpiracaoCicloAnterior = new Date(data);
	dataExpiracaoCicloAnterior.setDate(dataExpiracaoCicloAnterior.getDate() + numeroDias);
	return dataExpiracaoCicloAnterior;
}

export const formataData = (data: Date | undefined) => {
	if (data === undefined) return;
	const dia = data.getDate();
	const mes = data.getMonth() + 1;
	const ano = data.getFullYear();
	return `${dia < 10 ? `0${dia}` : dia}/${mes < 10 ? `0${mes}` : mes}/${ano}`;
};

export const dateParaStringDatePicker = (data: Date): string => {
	const dataLocal = data.toLocaleDateString('pt-br', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
	const dadosData = dataLocal.split('/');
	return dadosData[2] + '-' + dadosData[1] + '-' + dadosData[0];
};

export const getMesAbreviado = (data: Date | undefined) => {
	const mes = data?.toLocaleDateString('pt-Br', { month: 'short' }) ?? '';
	return mes ? mes[0].toUpperCase() + mes.slice(1, 3) : '';
};
