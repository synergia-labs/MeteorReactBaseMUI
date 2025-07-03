import { z } from "zod";
import { meteorUserSchema, userProfileSchema } from "./meteorUser";
import { createUserSchema } from "./createUser";

const upsertUserSchema = createUserSchema.partial().extend({
	profile: userProfileSchema.partial().optional()
});
const upsertUserReturnSchema = meteorUserSchema.omit({ services: true }).extend({});

type UpsertUserType = z.infer<typeof upsertUserSchema>;
type UpsertUserReturnType = z.infer<typeof upsertUserReturnSchema>;
export { upsertUserSchema, upsertUserReturnSchema };
export type { UpsertUserType, UpsertUserReturnType };
