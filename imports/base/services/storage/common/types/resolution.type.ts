import { z } from 'zod';

enum enumResolutions {
	P144 = 144,
	P240 = 240,
	P360 = 360,
	P480 = 480,
	P720 = 720,
	P1080 = 1080,
	P1440 = 1440,
	P2160 = 2160,
	DEFAULT = 9999
}

export const enumResolution = z.nativeEnum(enumResolutions);
export type ResolutionType = z.infer<typeof enumResolution>;
