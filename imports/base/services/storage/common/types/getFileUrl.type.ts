import { z } from 'zod';
import { enumFileType } from './file.type';
import { enumResolution } from './resolution.type';

export const getFileUrlSch = z.object({
	_id: z.string(),
	type: enumFileType,
	resolution: enumResolution.optional(),
	isDownload: z.boolean().optional(),
	withPreview: z.boolean().default(true)
});

/**
 * Tipo que representa os parâmetros para obter a URL de um arquivo.
 *
 * @property _id         - ID único do arquivo.
 * @property type        - Tipo do arquivo (exemplo: imagem, vídeo, documento).
 * @property resolution  - Resolução do arquivo (opcional).
 * @property isDownload  - Indica se o arquivo deve ser baixado (opcional).
 * @property withPreview - Define se a URL retornada incluirá uma pré-visualização (opcional).
 */
export type GetFileUrlType = Omit<z.infer<typeof getFileUrlSch>, 'withPreview'> & {
	withPreview?: boolean;
};
