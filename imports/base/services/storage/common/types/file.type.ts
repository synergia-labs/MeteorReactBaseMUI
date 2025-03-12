import { z } from 'zod';

enum FileTypes {
	VIDEO = 'videos',
	AUDIO = 'audios',
	IMAGE = 'images',
	DOCUMENT = 'documents'
}

export const enumFileType = z.nativeEnum(FileTypes);
export type FileType = z.infer<typeof enumFileType>;
