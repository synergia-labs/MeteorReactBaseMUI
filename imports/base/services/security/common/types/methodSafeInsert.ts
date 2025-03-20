import { z } from "zod";
import { enumMethodTypes } from "../enums/methodTypes";

export const paramMethodSafeInsertSch = z.object({
	referred: z.string(),
	name: z.string(),
	type: enumMethodTypes,
	description: z.string().optional(),
	isProtected: z.boolean().optional(),
	roles: z.array(z.string()).default([])
});

export const returnMethodSafeInsertSch = z.object({
	_id: z.string()
});

export type ParamMethodSafeInsertType = z.infer<typeof paramMethodSafeInsertSch>;
export type ReturnMethodSafeInsertType = z.infer<typeof returnMethodSafeInsertSch>;
