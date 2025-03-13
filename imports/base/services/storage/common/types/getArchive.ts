import { z } from 'zod';
import { enumResolution } from './resolution.type';

/**
 * Esquema para os parâmetros necessários para obter um arquivo.
 *
 * @property _id        - ID único do arquivo.
 * @property userId     - ID do usuário solicitante (opcional).
 * @property resolution - Resolução desejada para o arquivo (opcional).
 * @property access     - Tipo de acesso necessário para o arquivo (opcional).
 * @property dl         - Indica se o arquivo será baixado (opcional).
 * @property preview    - Indica se o arquivo será exibido como uma pré-visualização (opcional).
 */
export const paramGetArchiveSch = z.object({
	_id: z.string(),
	userId: z.string().optional(),
	resolution: enumResolution.optional(),
	access: z.string().optional(),
	dl: z.number().optional(),
	preview: z.number().optional()
});

/**
 * Tipo que representa os parâmetros para obter um arquivo.
 *
 * @property _id        - ID único do arquivo.
 * @property userId     - ID do usuário solicitante (opcional).
 * @property resolution - Resolução desejada para o arquivo (opcional).
 * @property access     - Tipo de acesso necessário para o arquivo (opcional).
 * @property dl         - Indica se o arquivo será baixado (opcional).
 * @property preview    - Indica se o arquivo será exibido como uma pré-visualização (opcional).
 */
export type ParamGetArchiveType = z.infer<typeof paramGetArchiveSch>;

/**
 * Esquema para o retorno da obtenção de um arquivo.
 *
 * @property url - URL do arquivo, se disponível (opcional).
 */
export const returnGetArchiveSch = z.object({
	url: z.string().optional()
});

/**
 * Tipo que representa o retorno da obtenção de um arquivo.
 *
 * @property url - URL do arquivo, se disponível (opcional).
 */
export type ReturnGetArchiveType = z.infer<typeof returnGetArchiveSch>;
