import { z } from "zod";
import { meteorUserSchema } from "./meteorUser";

export const onLogoutSchema = z.object({
    user: meteorUserSchema,
});

export type OnLogoutType = z.infer<typeof onLogoutSchema>;