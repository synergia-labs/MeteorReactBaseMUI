export const nomeArquivoComData = (titulo: string): string => {
	const data = new Date();
	return (
		'Relatorio de ' +
		titulo +
		' - ' +
		data.getUTCDate() +
		'-' +
		(data.getUTCMonth() + 1) +
		'-' +
		data.getUTCFullYear() +
		' ' +
		data.getHours() +
		'-' +
		data.getMinutes()
	);
};
