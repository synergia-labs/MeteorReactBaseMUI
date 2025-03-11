import { z } from 'zod';
import { Buffer } from 'buffer';

export const ArchiveSch = z.object({
	alt: z.string(),
	name: z.string(),
	type: z.string(),
	size: z.number(),
	content: z.union([z.string(), z.instanceof(Buffer)])
});

export type ArchiveType = z.infer<typeof ArchiveSch>;
