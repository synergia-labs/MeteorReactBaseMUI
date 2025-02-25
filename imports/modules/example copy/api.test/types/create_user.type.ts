import { z } from 'zod';

export const paramCreateUserSch = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const returnCreateUserSch = z.object({
	id: z.string()
});

export type ParamCreateUserType = z.infer<typeof paramCreateUserSch>;
export type ReturnCreateUserType = z.infer<typeof returnCreateUserSch>;
