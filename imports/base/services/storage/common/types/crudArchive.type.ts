import { z } from 'zod';
import { ResolutionEnum } from './resolution.type';
import { ArchiveSch } from '/imports/base/types/archive';
import { Buffer } from 'buffer';

export const paramUploadArchiveSch = z.object({
	archive: ArchiveSch,
	isRestricted: z.boolean().optional()
});
export const returnUploadArchiveSch = z.object({
	_id: z.string()
});

export const paramGetArchiveSch = z.object({
	_id: z.string(),
	userId: z.string().optional(),
	resolution: ResolutionEnum.optional()
});
export const returnGetArchiveSch = z.object({
	url: z.string()
});

export const paramDeleteArchiveSch = z.object({});
export const returnDeleteArchiveSch = z.object({});

export type ParamUploadArchiveType = z.infer<typeof paramUploadArchiveSch>;
export type ReturnUploadArchiveType = z.infer<typeof returnUploadArchiveSch>;

export type ParamGetArchiveType = z.infer<typeof paramGetArchiveSch>;
export type ReturnGetArchiveType = z.infer<typeof returnGetArchiveSch>;

export type ParamDeleteArchiveType = z.infer<typeof paramDeleteArchiveSch>;
export type ReturnDeleteArchiveType = z.infer<typeof returnDeleteArchiveSch>;
