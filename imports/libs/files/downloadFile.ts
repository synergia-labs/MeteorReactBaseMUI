import * as fs from "fs";
import axios from "axios";

/**
 * Baixa um arquivo de uma URL e salva-o em um destino local.
 * Esta função utiliza `axios` para fazer a requisição e `fs` para escrever o arquivo no sistema de arquivos.
 * Ela é otimizada para lidar com grandes arquivos através do uso de streams.
 *
 * @param url A URL do arquivo a ser baixado.
 * @param dest O caminho completo do arquivo de destino no sistema de arquivos local.
 * @returns Uma Promise que resolve quando o download é concluído com sucesso, ou rejeita em caso de erro.
 *
 * @throws {Error} Rejeita a Promise se ocorrer um erro durante o download ou gravação do arquivo.
 *
 * @example
 * ```typescript
 * import { downloadFile } from './path/to/your/module'; // Ajuste o caminho conforme necessário
 *
 * async function exampleDownload() {
 * const imageUrl = "[https://example.com/image.jpg](https://example.com/image.jpg)";
 * const destinationPath = "./downloads/my_image.jpg";
 *
 * try {
 * console.log(`Iniciando download de ${imageUrl} para ${destinationPath}...`);
 * await downloadFile(imageUrl, destinationPath);
 * console.log("Download concluído com sucesso!");
 * } catch (error) {
 * console.error("Falha no download:", error);
 * }
 * }
 *
 * exampleDownload();
 * ```
 */
export async function downloadFile(url: string, dest: string): Promise<void> {
	// Cria um stream de escrita para o arquivo de destino.
	// Isso permite que os dados sejam gravados no disco à medida que são recebidos,
	// evitando carregar o arquivo inteiro na memória.
	const writerImages = fs.createWriteStream(dest);

	// Faz uma requisição GET para a URL fornecida usando axios.
	// 'responseType: "stream"' é crucial para lidar com arquivos grandes de forma eficiente,
	// pois o corpo da resposta é retornado como um stream de dados.
	const responseImages = await axios({
		url: url,
		method: "GET",
		responseType: "stream",
		// Define um tempo limite alto (30 segundos) para o download.
		// É importante para evitar que a requisição fique travada indefinidamente em caso de lentidão.
		timeout: 30000, // 30 segundos em milissegundos
		// Mensagem de erro personalizada para o timeout.
		timeoutErrorMessage: "Timeout ao baixar o arquivo. Caso a conexão esteja lenta, tente novamente mais tarde."
	});

	// Conecta o stream de dados da resposta do axios (responseImages.data)
	// ao stream de escrita do arquivo (writerImages).
	// Isso "pipa" os dados diretamente do download para o arquivo no disco.
	responseImages.data.pipe(writerImages);

	// Retorna uma nova Promise para controlar o fim do download.
	// A Promise resolve quando o stream de escrita do arquivo 'termina' (finish),
	// o que significa que todos os dados foram gravados.
	// A Promise rejeita se ocorrer um erro durante a gravação do arquivo (error).
	return new Promise((resolve, reject) => {
		// Evento 'finish': acionado quando todos os dados foram gravados no arquivo.
		writerImages.on("finish", () => {
			// Fecha o stream de escrita, liberando os recursos.
			writerImages.close();
			// Resolve a Promise indicando sucesso.
			resolve();
		});

		// Evento 'error': acionado se ocorrer um erro durante a gravação do arquivo.
		writerImages.on("error", (error: Error) => {
			// Loga o erro para depuração.
			console.error("Erro ao baixar o arquivo: ", dest);
			// Rejeita a Promise com o erro.
			reject(error);
		});
	});
}
