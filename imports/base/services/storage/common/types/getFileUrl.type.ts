import { z } from 'zod';
import { FileTypeEnum } from './file.type';
import { enumResolution } from './resolution.type';

export const getFileUrlSch = z.object({
	_id: z.string(),
	type: FileTypeEnum,
	resolution: enumResolution.optional(),
	isDownload: z.boolean().optional()
});

export type GetFileUrlType = z.infer<typeof getFileUrlSch>;
