import { z } from "zod";
import { meteorUserSchema } from "./meteorUser";
import { connectionSchema } from "/imports/base/types/connection";

export const onLoginSchema = z.object({
	user: meteorUserSchema,
	connection: connectionSchema
});

export type OnLoginType = z.infer<typeof onLoginSchema>;
