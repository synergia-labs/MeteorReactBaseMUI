import { z } from 'zod';

export const paramMethodSafeInsertSch = z.object({
	referred: z.string(),
	name: z.string(),
	description: z.string().optional(),
	roles: z.array(z.string()).default([])
});

export const returnMethodSafeInsertSch = z.object({
	_id: z.string()
});

export type ParamMethodSafeInsertType = z.infer<typeof paramMethodSafeInsertSch>;
export type ReturnMethodSafeInsertType = z.infer<typeof returnMethodSafeInsertSch>;
