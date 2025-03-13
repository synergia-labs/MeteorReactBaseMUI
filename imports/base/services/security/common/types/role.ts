import { z } from 'zod';

export const RoleSch = z.object({
	referred: z.string(),
	name: z.string(),
	description: z.string().optional()
});

export type RoleType = z.infer<typeof RoleSch>;
