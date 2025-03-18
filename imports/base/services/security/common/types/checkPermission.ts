import { z } from 'zod';

export const paramCheckPermissionSch = z.object({
	names: z.array(z.string()),
	referred: z.string().optional()
});

export const returnCheckPermissionSch = z.record(z.boolean());

export type ParamCheckPermissionType = z.infer<typeof paramCheckPermissionSch>;
export type ReturnCheckPermissionType = z.infer<typeof returnCheckPermissionSch>;
