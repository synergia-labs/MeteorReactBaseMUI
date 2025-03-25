import { z } from "zod";
import { paramRoleSafeInsertSch } from "./roleSafeInsert";
import { AuditSch } from "../../../../types/audit";
import { paramMethodSafeInsertSch } from "./methodSafeInsert";

export const paramGetSch = z.object({
	referred: z.string().optional(),
	name: z.string()
});

export const paramGetAllSch = z.object({
	referred: z.string().optional()
});

export const returnGetRoleSch = paramRoleSafeInsertSch.merge(AuditSch);
export const returnGetMethodSch = paramMethodSafeInsertSch.merge(AuditSch);

export type ParamGetType = z.infer<typeof paramGetSch>;
export type ParamGetAllType = z.infer<typeof paramGetAllSch>;
export type ReturnGetRoleType = z.infer<typeof returnGetRoleSch>;
export type ReturnGetMethodType = z.infer<typeof returnGetMethodSch>;
