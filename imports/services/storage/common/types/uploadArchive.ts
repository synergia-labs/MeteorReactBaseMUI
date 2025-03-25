import { z } from "zod";

import { ArchiveSch } from "../../../../types/archive";

/**
 * Esquema para os parâmetros necessários para fazer o upload de um arquivo.
 *
 * @property archive      - Arquivo a ser enviado, conforme o tipo `ArchiveSch`.
 * @property isRestricted - Define se o arquivo tem acesso restrito (opcional).
 */
export const paramUploadArchiveSch = z.object({
	archive: ArchiveSch,
	isRestricted: z.boolean().optional()
});

/**
 * Tipo que representa os parâmetros para o upload de um arquivo.
 *
 * @property archive      - Arquivo a ser enviado, conforme o tipo `ArchiveSch`.
 * @property isRestricted - Define se o arquivo tem acesso restrito (opcional).
 */
export type ParamUploadArchiveType = z.infer<typeof paramUploadArchiveSch>;

/**
 * Esquema para o retorno do upload de um arquivo.
 *
 * @property _id   - ID único do arquivo.
 * @property path  - Caminho do arquivo no sistema (opcional).
 */
export const returnUploadArchiveSch = z.object({
	_id: z.string(),
	path: z.string().optional()
});

/**
 * Tipo que representa o retorno do upload de um arquivo.
 *
 * @property _id   - ID único do arquivo.
 * @property path  - Caminho do arquivo no sistema (opcional).
 */
export type ReturnUploadArchiveType = z.infer<typeof returnUploadArchiveSch>;
