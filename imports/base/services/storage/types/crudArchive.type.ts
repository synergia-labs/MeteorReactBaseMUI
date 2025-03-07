import { z } from 'zod';
import { ResolutionEnum } from './resolution.type';

export const paramUploadArchiveSch = z.object({});
export const returnUploadArchiveSch = z.object({});

export const paramGetArchiveSch = z.object({
	_id: z.string(),
	resolution: ResolutionEnum.optional()
});
export const returnGetArchiveSch = z.object({
	url: z.string()
});

export const paramRemoveArchiveSch = z.object({});
export const returnRemoveArchiveSch = z.object({});

export type ParamUploadArchiveType = z.infer<typeof paramUploadArchiveSch>;
export type ReturnUploadArchiveType = z.infer<typeof returnUploadArchiveSch>;

export type ParamGetArchiveType = z.infer<typeof paramGetArchiveSch>;
export type ReturnGetArchiveType = z.infer<typeof returnGetArchiveSch>;

export type ParamRemoveArchiveType = z.infer<typeof paramRemoveArchiveSch>;
export type ReturnRemoveArchiveType = z.infer<typeof returnRemoveArchiveSch>;
