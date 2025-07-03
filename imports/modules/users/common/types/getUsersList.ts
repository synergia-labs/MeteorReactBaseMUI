import { z } from "zod";
import enumUserRoles from "../enums/enumUserRoles";

export const getUsersListParamSchema = z.object({
	name: z.string().optional(),
	role: z.nativeEnum(enumUserRoles).optional()
});

export type GetUsersListParamType = z.infer<typeof getUsersListParamSchema>;
