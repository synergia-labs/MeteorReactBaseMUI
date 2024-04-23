export const diferencaEntreDatas = (data: Date) => {
	const hoje = new Date();
	const diferenca = Math.abs(hoje.getTime() - data?.getTime());
	const diferencaEmMinutos = Math.ceil(diferenca / (1000 * 60));
	const diferencaEmHoras = Math.ceil(diferenca / (1000 * 60 * 60));
	const diferencaEmDias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
	const diferencaEmSemanas = Math.ceil(diferenca / (1000 * 60 * 60 * 24 * 7));

	if (diferencaEmMinutos <= 60) {
		return `${diferencaEmMinutos}min`;
	} else if (diferencaEmHoras <= 24) {
		return `${diferencaEmHoras}h`;
	} else if (diferencaEmDias < 7) {
		return `${diferencaEmDias}d`;
	} else if (diferencaEmDias >= 7 && diferencaEmDias <= 30) {
		return `${diferencaEmSemanas}sem`;
	} else {
		const dataCompleta = `${data?.toLocaleDateString('pt-BR', {
			month: 'long',
			year: 'numeric'
		})}`;
		const dataReduzida = dataCompleta.split(/\s*de\s*/);
		const mes = dataReduzida[0];
		const ano = dataReduzida[1];
		return `${mes[0]?.toUpperCase() + mes.substring(1, 3) + ' ' + ano}`;
	}
};
