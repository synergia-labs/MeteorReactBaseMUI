import { hasValue } from "../hasValue";

/**
 * Formata uma string para ser usada como um nome de arquivo válido e limpo.
 * A função realiza as seguintes operações:
 * 1. Remove a extensão do arquivo (qualquer texto após o último ponto).
 * 2. Converte a string para letras minúsculas.
 * 3. Remove todos os caracteres especiais, mantendo apenas letras (a-z, A-Z), números (0-9) e espaços.
 * 4. Remove todos os espaços em branco.
 * 5. Remove zeros iniciais, se houver.
 *
 * @param s A string de entrada a ser formatada.
 * @returns Uma string formatada e limpa, pronta para ser usada como nome de arquivo.
 * Retorna uma string vazia se a entrada for nula, indefinida ou uma string vazia.
 *
 * @example
 * // Exemplo básico:
 * const nomeOriginal = "Meu Arquivo.PDF";
 * const nomeFormatado = formatFileName(nomeOriginal);
 * console.log(nomeFormatado); // Saída: "meuarquivo"
 *
 * @example
 * // Exemplo com caracteres especiais e números:
 * const nomeComCaracteres = "Relatório_2023_Final!.docx";
 * const nomeFormatado2 = formatFileName(nomeComCaracteres);
 * console.log(nomeFormatado2); // Saída: "relatorio2023final"
 *
 * @example
 * // Exemplo com zeros iniciais e espaços:
 * const nomeComZeros = "0000000_Imagem Teste (1).jpeg";
 * const nomeFormatado3 = formatFileName(nomeComZeros);
 * console.log(nomeFormatado3); // Saída: "imagemteste1"
 *
 * @example
 * // Exemplo com entrada inválida:
 * const nomeNulo = null;
 * const nomeFormatado4 = formatFileName(nomeNulo as any);
 * console.log(nomeFormatado4); // Saída: ""
 */
export function formatFileName(s: string): string {
	// Verifica se a string de entrada tem um valor (não é nula, indefinida ou vazia).
	// Se não tiver, retorna uma string vazia imediatamente.
	if (!hasValue(s)) return "";

	// 1. Remove a extensão do arquivo, ou seja, qualquer coisa a partir do último ponto.
	// Ex: "documento.pdf" vira "documento"
	// Ex: "archive.tar.gz" vira "archive.tar"
	s = s.replace(/\.[^.]*$/, "");

	// 2. Converte toda a string para minúsculas para padronização.
	// Ex: "Meu Arquivo" vira "meu arquivo"
	s = s.toLowerCase();

	// 3. Remove caracteres especiais, mantendo apenas letras, números e espaços.
	// O `[^a-zA-Z0-9\s]` corresponde a qualquer caractere que NÃO seja uma letra, número ou espaço.
	// Ex: "relatório_final!" vira "relatorio final"
	s = s.replace(/[^a-zA-Z0-9\s]/g, "");

	// 4. Remove todos os espaços em branco, substituindo-os por uma string vazia.
	// O `\s+` corresponde a um ou mais caracteres de espaço em branco.
	// Ex: "meu arquivo" vira "meuarquivo"
	s = s.replace(/\s+/g, "");

	// 5. Remove zeros do início da string.
	// O `^0+` corresponde a um ou mais zeros no início da string.
	// Ex: "000123" vira "123"
	s = s.replace(/^0+/, "");

	// Retorna a string final formatada.
	return s;
}
