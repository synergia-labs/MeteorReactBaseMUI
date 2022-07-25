export const compararDatas = (dataInicial, dataFinal, inverterComparacao) => {
    const dInicialSemHora = new Date(
        dataInicial.getUTCMonth() +
            1 +
            '-' +
            dataInicial.getUTCDate() +
            '-' +
            dataInicial.getUTCFullYear()
    );
    const dFinalSemHora = new Date(
        dataFinal.getUTCMonth() +
            1 +
            '-' +
            dataFinal.getUTCDate() +
            '-' +
            dataFinal.getUTCFullYear()
    );
    return inverterComparacao
        ? dInicialSemHora.getTime() < dFinalSemHora.getTime()
        : dInicialSemHora.getTime() > dFinalSemHora.getTime();
};
