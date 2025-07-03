import * as fs from "fs";
import unzipper from "unzipper";
import { deleteFile } from "./deleteFile"; // Assume que deleteFile está no mesmo diretório ou caminho relativo.

/**
 * Descompacta (unzip) um arquivo .zip para um diretório de destino e, opcionalmente,
 * exclui o arquivo .zip original após a descompactação bem-sucedida.
 *
 * Esta função cria um stream de leitura do arquivo .zip e o "pipa" para o `unzipper.Extract`,
 * que lida com a extração dos arquivos para o diretório de destino.
 *
 * @param zipPath O caminho completo para o arquivo .zip a ser descompactado.
 * @param dest O caminho completo do diretório onde os arquivos descompactados serão extraídos.
 * @returns Uma Promise que resolve quando a descompactação é concluída e o arquivo .zip original é removido (se aplicável),
 * ou rejeita em caso de erro durante a leitura, extração ou exclusão do arquivo.
 *
 * @example
 * ```typescript
 * import { unzipFile } from './path/to/your/module'; // Ajuste o caminho conforme necessário
 *
 * async function exampleUnzip() {
 * const zipFilePath = "./arquivos/meu_arquivo.zip";
 * const destinationFolder = "./extraidos";
 *
 * try {
 * console.log(`Iniciando descompactação de ${zipFilePath} para ${destinationFolder}...`);
 * await unzipFile(zipFilePath, destinationFolder);
 * console.log("Descompactação concluída e arquivo original excluído!");
 * } catch (error) {
 * console.error("Falha na descompactação:", error);
 * }
 * }
 *
 * // Certifique-se de que o arquivo zip e o diretório de destino existam para testar.
 * // exampleUnzip();
 * ```
 */
export function unzipFile(zipPath: string, dest: string): Promise<void> {
	return new Promise((resolve, reject) => {
		fs
			.createReadStream(zipPath)
			.pipe(unzipper.Extract({ path: dest }))
			.on("close", () => {
				deleteFile(zipPath);
				resolve();
			})
			.on("error", (error: any) => {
				console.error("Erro ao descompactar o arquivo: ", dest);
				reject(error);
			});
	});
}
