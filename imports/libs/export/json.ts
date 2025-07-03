/**
 * Exporta um objeto JavaScript para um arquivo JSON e inicia o download no navegador.
 *
 * @param object - O objeto JavaScript a ser convertido em JSON e exportado
 * @param fileName - O nome do arquivo que será baixado (deve incluir a extensão .json)
 *
 * @example
 * ```typescript
 * // Exporta um objeto para um arquivo chamado "dados.json"
 * const meusDados = { nome: "João", idade: 30, cargos: ["Dev", "Gerente"] };
 * exportJsonFile(meusDados, "dados.json");
 * ```
 *
 * @remarks
 * Esta função:
 * - Converte o objeto para uma string JSON formatada com indentação de 2 espaços
 * - Cria um Blob contendo o JSON
 * - Gera dinamicamente um elemento <a> para iniciar o download
 * - Limpa os recursos após o download ser iniciado
 *
 * @throws {Error} Pode lançar erros durante a manipulação do DOM ou criação do objeto URL
 *
 * @returns {void}
 */
function exportJsonFile(object: object, fileName: string): void {
	const jsonString = JSON.stringify(object, null, 2);
	const blob = new Blob([jsonString], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

export default exportJsonFile;
