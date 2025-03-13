import { z } from 'zod';

/**
 * Enumeração das resoluções disponíveis para arquivos de mídia.
 * Representa diferentes qualidades de vídeo/imagem em pixels.
 */
enum enumResolutions {
	/** Resolução 144p (baixa qualidade) */
	P144 = 144,

	/** Resolução 240p (qualidade baixa) */
	P240 = 240,

	/** Resolução 360p (qualidade padrão para vídeos móveis) */
	P360 = 360,

	/** Resolução 480p (qualidade SD) */
	P480 = 480,

	/** Resolução 720p (qualidade HD) */
	P720 = 720,

	/** Resolução 1080p (qualidade Full HD) */
	P1080 = 1080,

	/** Resolução 1440p (qualidade Quad HD) */
	P1440 = 1440,

	/** Resolução 2160p (qualidade 4K) */
	P2160 = 2160,

	/** Valor padrão para resolução indefinida */
	DEFAULT = 9999
}

/**
 * Esquema Zod para validar as resoluções disponíveis.
 * Utiliza a enumeração `enumResolutions`.
 */
export const enumResolution = z.nativeEnum(enumResolutions);

/**
 * Tipo inferido a partir do esquema `enumResolution`.
 * Representa um dos valores da enumeração `enumResolutions`.
 */
export type ResolutionType = z.infer<typeof enumResolution>;
