import { z } from "zod";
import { meteorUserSchema } from "./meteorUser";

export const onCreateUserSchema = z.object({
	user: meteorUserSchema,
	options: z.any()
});

export type OnCreateUserType = z.infer<typeof onCreateUserSchema>;
