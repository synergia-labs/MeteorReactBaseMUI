import { z } from 'zod';

/**
 * Esquema para os parâmetros necessários para deletar um arquivo.
 *
 * @property _id - ID único do arquivo a ser deletado.
 */
export const paramDeleteArchiveSch = z.object({
	_id: z.string()
});

/**
 * Tipo que representa os parâmetros para deletar um arquivo.
 *
 * @property _id - ID único do arquivo a ser deletado.
 */
export type ParamDeleteArchiveType = z.infer<typeof paramDeleteArchiveSch>;

/**
 * Esquema para o retorno da exclusão de um arquivo.
 *
 * @property message - Mensagem de confirmação ou erro sobre a exclusão (opcional).
 */
export const returnDeleteArchiveSch = z.object({
	message: z.string().optional()
});

/**
 * Tipo que representa o retorno da exclusão de um arquivo.
 *
 * @property message - Mensagem de confirmação ou erro sobre a exclusão (opcional).
 */
export type ReturnDeleteArchiveType = z.infer<typeof returnDeleteArchiveSch>;
