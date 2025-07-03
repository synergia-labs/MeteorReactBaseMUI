import * as fs from "fs";

/**
 * Exclui um arquivo ou diretório de um caminho especificado.
 *
 * Esta função verifica primeiro se o caminho existe. Se for um diretório,
 * ele tentará excluí-lo recursivamente. Se for um arquivo, ele o excluirá.
 * Mensagens de sucesso ou erro são exibidas no console.
 *
 * @param filePath O caminho completo para o arquivo ou diretório a ser excluído.
 *
 * @example
 * // Exemplo de uso para excluir um arquivo:
 * // deleteFile("./downloads/meu_arquivo.txt");
 *
 * @example
 * // Exemplo de uso para excluir um diretório e seu conteúdo:
 * // deleteFile("./minha_pasta_vazia");
 */
export function deleteFile(filePath: string): void {
	if (!fs.existsSync(filePath)) return;
	if (fs.lstatSync(filePath).isDirectory()) {
		fs.rmdirSync(filePath, { recursive: true });
		console.info(`Diretório ${filePath} excluído com sucesso`);
	} else {
		fs.unlink(filePath, (err) => {
			if (err) console.error(`Erro ao excluir o arquivo ${filePath}:`, err);
			else console.info(`Arquivo ${filePath} excluído com sucesso`);
		});
	}
}
