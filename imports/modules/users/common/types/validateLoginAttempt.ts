import { z } from "zod";
import { meteorUserSchema } from "./meteorUser";
import { connectionSchema } from "../../../../types/connection";

export const validateLoginAttemptSchema = z.object({
	type: z.string(),
	allowed: z.boolean(),
	methodName: z.string(),
	methodArguments: z.array(z.object({ user: z.object({ email: z.string() }) })),
	user: meteorUserSchema,
	connection: connectionSchema
});

export type ValidateLoginAttemptType = z.infer<typeof validateLoginAttemptSchema>;
