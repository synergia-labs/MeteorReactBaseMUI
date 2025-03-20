import { z } from "zod";
import { meteorUserSchema, userProfileSchema } from "./meteorUser";

const emailField = meteorUserSchema.pick({ emails: true });
const profile = userProfileSchema.pick({
	name: true,
	roles: true,
	connected: true
});

export const getUsersListParamSchema = z.object({
	name: z.string().optional()
});

export const getUsersListReturnSchema = z.object({
	_id: z.string(),
	...emailField.shape,
	profile: profile
});

export type GetUsersListParamType = z.infer<typeof getUsersListParamSchema>;
export type GetUsersListReturnType = z.infer<typeof getUsersListReturnSchema>;
