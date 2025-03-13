import { z } from 'zod';

/**
 * Enumeração que representa os tipos de arquivos suportados pelo sistema.
 */
enum FileTypes {
	/** Arquivos de vídeo (exemplo: MP4, WebM, AVI) */
	VIDEO = 'videos',

	/** Arquivos de áudio (exemplo: MP3, WAV, OGG) */
	AUDIO = 'audios',

	/** Arquivos de imagem (exemplo: PNG, JPG, GIF) */
	IMAGE = 'images',

	/** Arquivos de documento (exemplo: PDF, DOCX, XLSX) */
	DOCUMENT = 'documents'
}

/**
 * Esquema Zod para validação dos tipos de arquivos suportados.
 * Utiliza a enumeração `FileTypes`.
 */
export const enumFileType = z.nativeEnum(FileTypes);

/**
 * Tipo inferido a partir do esquema `enumFileType`.
 * Representa um dos valores da enumeração `FileTypes`.
 */
export type FileType = z.infer<typeof enumFileType>;
