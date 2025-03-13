import { z } from 'zod';

export const paramRoleSafeInsertSch = z.object({
	referred: z.string(),
	name: z.string(),
	description: z.string().optional()
});

export const returnRoleSafeInsertSch = z.object({
	_id: z.string()
});

export type ParamRoleSafeInsertType = z.infer<typeof paramRoleSafeInsertSch>;
export type ReturnRoleSafeInsertType = z.infer<typeof returnRoleSafeInsertSch>;
