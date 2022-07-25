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
        return `${data?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
    }
};
