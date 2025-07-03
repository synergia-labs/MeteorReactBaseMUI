import * as fs from "fs";
import path from "path";

/**
 * Move todos os arquivos de um diretório de origem para um diretório de destino
 * e, em seguida, exclui o diretório de origem.
 *
 * Esta função é síncrona e irá mover um por um todos os itens (arquivos e subdiretórios)
 * presentes no diretório de origem para o diretório de destino.
 * Após a movimentação de todos os itens, o diretório de origem será removido.
 *
 * @param source O caminho completo do diretório de origem de onde os arquivos serão movidos.
 * @param dest O caminho completo do diretório de destino para onde os arquivos serão movidos.
 *
 * @throws {Error} Lança um erro se o diretório de origem não puder ser lido,
 * se a movimentação de algum arquivo/diretório falhar, ou se o diretório de origem não puder ser removido.
 *
 * @example
 * ```typescript
 * import { moveFile } from './path/to/your/module'; // Ajuste o caminho conforme necessário
 * import * as fs from 'fs';
 * import * as path from 'path';
 *
 * // Exemplo de uso:
 * const sourceDir = "./temp_files";
 * const destDir = "./processed_files";
 *
 * // Certifique-se de que o diretório de origem exista e o de destino também, ou seja criado.
 * // fs.mkdirSync(sourceDir, { recursive: true });
 * // fs.mkdirSync(destDir, { recursive: true });
 * // fs.writeFileSync(path.join(sourceDir, "file1.txt"), "Conteúdo 1");
 * // fs.writeFileSync(path.join(sourceDir, "file2.txt"), "Conteúdo 2");
 *
 * try {
 * console.log(`Movendo arquivos de '${sourceDir}' para '${destDir}'...`);
 * moveFile(sourceDir, destDir);
 * console.log("Movimentação concluída e diretório de origem removido.");
 * } catch (error) {
 * console.error("Erro ao mover arquivos:", error);
 * }
 * ```
 *
 * @remarks
 * Esta função utiliza operações síncronas (`fs.readdirSync`, `fs.renameSync`, `fs.rmdirSync`).
 * Para grandes quantidades de arquivos ou operações em ambientes de alta concorrência,
 * é recomendável considerar uma abordagem assíncrona para evitar o bloqueio do event loop.
 */
export function moveFiles(source: string, dest: string): void {
	if (!fs.existsSync(source)) return;
	fs.readdirSync(source).forEach((file) => {
		const currentPath = path.join(source, file);
		const destPath = path.join(dest, file);
		fs.renameSync(currentPath, destPath);
	});
	fs.rmdirSync(source);
}
