import * as fs from "fs";
import path from "path";
import { unzipFile } from "./unzipFile"; // Importa a função unzipFile
import { moveFiles } from "./moveFile"; // Importa a função moveFile

/**
 * Descompacta recursivamente arquivos .zip dentro de um diretório e move
 * o conteúdo de subdiretórios para o diretório de destino principal.
 *
 * Esta função primeiro descompacta o arquivo .zip inicial no diretório de destino.
 * Em seguida, ela itera sobre os arquivos e diretórios recém-extraídos.
 * - Se encontrar um arquivo .zip, ela chama a si mesma (`unzipRecursive`) para descompactá-lo também.
 * - Se encontrar um diretório, ela move todo o seu conteúdo para o diretório de destino principal
 * e, em seguida, chama a si mesma (`unzipRecursive`) no diretório que acabou de ter o conteúdo movido.
 * Essa chamada final é para garantir que, se o subdiretório contiver outros .zips, eles também sejam processados.
 *
 * @param zipPath O caminho completo para o arquivo .zip inicial a ser descompactado.
 * @param dest O caminho completo do diretório onde todos os arquivos descompactados serão extraídos e consolidados.
 * @returns Uma Promise que resolve quando todas as operações de descompactação e movimentação recursivas são concluídas.
 *
 * @example
 * ```typescript
 * import { unzipRecursive } from './path/to/your/module'; // Ajuste o caminho conforme necessário
 * import * as fs from 'fs';
 * import * as path from 'path';
 *
 * async function exampleRecursiveUnzip() {
 * const initialZip = "./archives/main_archive.zip";
 * const finalDestination = "./all_extracted_files";
 *
 * // Simule a existência de um arquivo zip inicial e um diretório de destino.
 * // fs.mkdirSync(path.dirname(initialZip), { recursive: true });
 * // fs.mkdirSync(finalDestination, { recursive: true });
 * // fs.writeFileSync(initialZip, 'conteúdo_zip_aqui'); // Conteúdo real de um zip necessário para o teste
 *
 * try {
 * console.log(`Iniciando descompactação recursiva de '${initialZip}' para '${finalDestination}'...`);
 * await unzipRecursive(initialZip, finalDestination);
 * console.log("Descompactação recursiva e consolidação concluídas!");
 * } catch (error) {
 * console.error("Erro durante a descompactação recursiva:", error);
 * }
 * }
 *
 * // exampleRecursiveUnzip();
 * ```
 *
 * @remarks
 * - Esta função é projetada para "achatar" estruturas de diretórios aninhadas que resultam de arquivos .zip,
 * movendo todo o conteúdo extraído para um único diretório de destino.
 * - A lógica `unzipRecursive(currentPath, dest)` dentro do bloco `else if (fs.lstatSync(currentPath).isDirectory())`
 * pode ser um pouco confusa. Ela é necessária porque `moveFile` apenas move o *conteúdo* do diretório `currentPath` para `dest`.
 * Após essa movimentação, o diretório `currentPath` deveria estar vazio e ser removido por `moveFile`. No entanto,
 * se houver `.zip`s dentro do `currentPath` que não foram descompactados na primeira passagem, essa chamada recursiva
 * garante que eles sejam processados caso o `moveFile` não os tenha removido.
 * No entanto, a função `moveFile` já inclui a remoção do diretório de origem. Isso implica que, após `moveFile(currentPath, dest)`,
 * `currentPath` não existirá mais. Portanto, a chamada `unzipRecursive(currentPath, dest)` logo após `moveFile`
 * nunca será executada com um diretório existente, o que pode indicar uma lógica desnecessária ou um potencial ponto de falha.
 * **Sugestão de Revisão:** A chamada `unzipRecursive(currentPath, dest)` dentro do bloco `isDirectory()` após `moveFile`
 * provavelmente não terá efeito, já que `currentPath` (o diretório de origem) é removido por `moveFile`. A intenção pode ter sido
 * processar sub-zips que foram *movidos* para `dest`, não o diretório de origem original.
 */
export async function unzipRecursive(zipPath: string, dest: string): Promise<void> {
	if (!fs.existsSync(zipPath)) return;
	await unzipFile(zipPath, dest);
	const files = fs.readdirSync(dest);
	files.forEach((file) => {
		const currentPath = path.join(dest, file);
		if (currentPath.endsWith(".zip")) {
			unzipRecursive(currentPath, dest);
		} else if (fs.lstatSync(currentPath).isDirectory()) {
			moveFiles(currentPath, dest);
			unzipRecursive(currentPath, dest);
		}
	});
}
