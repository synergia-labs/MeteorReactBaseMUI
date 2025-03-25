import { AuditType } from "../../../../types/audit";

/**
 * Tipo que representa um arquivo no sistema.
 *
 * @property _id               - ID único do arquivo.
 * @property name              - Nome do arquivo.
 * @property type              - Tipo MIME do arquivo (exemplo: "image/png").
 * @property size              - Tamanho do arquivo em bytes.
 * @property path              - Caminho no sistema onde o arquivo está armazenado.
 * @property extension         - Extensão do arquivo (exemplo: "png").
 * @property meta              - Metadados de auditoria associados ao arquivo (opcional).
 * @property isVideo           - Indica se o arquivo é um vídeo (opcional).
 * @property isAudio           - Indica se o arquivo é um áudio (opcional).
 * @property isImage           - Indica se o arquivo é uma imagem (opcional).
 * @property isText            - Indica se o arquivo é um arquivo de texto (opcional).
 * @property extensionWithDot  - Extensão do arquivo com ponto (exemplo: ".png", opcional).
 * @property mime              - Tipo MIME do arquivo (opcional).
 * @property copies            - Cópias do arquivo em diferentes versões ou formatos (opcional).
 * @property link              - Função para obter o link do arquivo, podendo incluir a versão.
 */
export interface IArchive {
	_id: string;

	/** Nome do arquivo. */
	name: string;

	/** Tipo MIME do arquivo (exemplo: "image/png"). */
	type: string;

	/** Tamanho do arquivo em bytes. */
	size: number;

	/** Caminho no sistema onde o arquivo está armazenado. */
	path: string;

	/** Extensão do arquivo (exemplo: "png"). */
	extension: string;

	/** Metadados de auditoria associados ao arquivo (opcional). */
	meta?: AuditType;

	/** Indica se o arquivo é um vídeo (opcional). */
	isVideo?: boolean;

	/** Indica se o arquivo é um áudio (opcional). */
	isAudio?: boolean;

	/** Indica se o arquivo é uma imagem (opcional). */
	isImage?: boolean;

	/** Indica se o arquivo é um arquivo de texto (opcional). */
	isText?: boolean;

	/** Extensão do arquivo com ponto (exemplo: ".png", opcional). */
	extensionWithDot?: string;

	/** Tipo MIME do arquivo (opcional). */
	mime?: string;

	/** Cópias do arquivo em diferentes versões ou formatos (opcional). */
	copies?: Record<string, any>;

	/** Função para obter o link do arquivo, podendo incluir a versão. */
	link: (version?: string) => string;
}
