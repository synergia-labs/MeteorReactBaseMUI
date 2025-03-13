import { z } from 'zod';

export const MethodSch = z.object({
	referred: z.string(),
	name: z.string(),
	description: z.string().optional(),
	roles: z.array(z.string()).default([])
});

export type MethodType = z.infer<typeof MethodSch>;
