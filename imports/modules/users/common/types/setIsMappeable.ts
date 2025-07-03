import { z } from "zod";

export const paramSetIsMappeable = z.object({
	personElementId: z.string(),
	functions: z.array(
		z.object({
			elementId: z.string(),
			isMappable: z.boolean()
		})
	)
});

export const returnSetIsMappeable = z.object({});

export type ParamSetIsMappeableType = z.infer<typeof paramSetIsMappeable>;
export type ReturnSetIsMappeableType = z.infer<typeof returnSetIsMappeable>;
