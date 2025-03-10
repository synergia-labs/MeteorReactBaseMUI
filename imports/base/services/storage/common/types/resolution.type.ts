import { z } from 'zod';

export const ResolutionEnum = z.enum(['SD', 'HD', 'FullHD', '4K']);
export type ResolutionType = z.infer<typeof ResolutionEnum>;
