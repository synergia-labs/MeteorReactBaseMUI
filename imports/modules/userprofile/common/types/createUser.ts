import { z } from "zod";
import { userProfileSchema } from "./meteorUser";

export const createUserSchema = userProfileSchema.extend({
	email: z.string().email(),
	password: z.string().min(6).optional()
});

export type CreateUserType = z.infer<typeof createUserSchema>;
