import { z } from "zod";
import { meteorUserSchema, userProfileSchema, userServicesSchema } from "./meteorUser";

export const createUserSchema = z.object({
	_id: z.string().optional(),
	email: z.string().email(),
	password: z.string().min(6).optional(),
	profile: userProfileSchema,
	services: userServicesSchema.optional(),
	sendVerificationEmail: z.boolean().optional(),
	sendEnrollmentEmail: z.boolean().optional()
});

export const createUserReturnSchema = meteorUserSchema.omit({ services: true });

export type CreateUserType = z.infer<typeof createUserSchema>;
export type CreateUserReturnType = z.infer<typeof createUserReturnSchema>;
