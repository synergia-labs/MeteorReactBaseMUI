import { z } from "zod";
import { meteorUserSchema, userProfileSchema } from "./meteorUser";

const updatetUserSchema = meteorUserSchema.partial().extend({
	email: z.string().email().optional(),
	profile: userProfileSchema.partial().optional()
});
const updatetUserReturnSchema = meteorUserSchema.omit({ services: true }).extend({});

type UpdatetUserType = z.infer<typeof updatetUserSchema>;
type UpdatetUserReturnType = z.infer<typeof updatetUserReturnSchema>;
export { updatetUserSchema, updatetUserReturnSchema };
export type { UpdatetUserType, UpdatetUserReturnType };
