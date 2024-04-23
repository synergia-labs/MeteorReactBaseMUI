export const retornarErrosUpload = (rejectedFiles: any, mensagens: any) => {
	let erroTamanho: boolean = false;
	rejectedFiles.forEach((f: any) => {
		f.errors.forEach((e: any) => {
			if (e.code === 'file-too-large') {
				erroTamanho = true;
			}
		});
	});
	return erroTamanho ? mensagens.tamanhoRejeitados : mensagens.arquivosRejeitados;
};
