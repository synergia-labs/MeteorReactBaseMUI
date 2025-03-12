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

export type GetFileUrlType = Omit<z.infer<typeof getFileUrlSch>, 'withPreview'> & {
	withPreview?: boolean;
};
