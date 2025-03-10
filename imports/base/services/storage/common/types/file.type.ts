import { z } from 'zod';

export const FileTypeEnum = z.enum(['video', 'audio', 'image', 'file']);
export type FileType = z.infer<typeof FileTypeEnum>;
