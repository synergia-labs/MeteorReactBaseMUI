import { z } from "zod";
import { UserProfileSchema } from "./IUserProfile";

export const CreateUserShema = UserProfileSchema.extend({
    email: z.string().email(),
    password: z.string().min(6),
});

export type ICreateUser = z.infer<typeof CreateUserShema>;