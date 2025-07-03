import { z } from "zod";

export const paramSetSimilarity = z.object({
	functions: z.array(
		z.object({
			elementId: z.string(),
			autonomy: z.number()
		})
	),
	personElementId: z.string()
});

export const returnSetSimilarity = z.object({});

export type ParamSetSimilarityType = z.infer<typeof paramSetSimilarity>;
export type ReturnSetSimilarityType = z.infer<typeof returnSetSimilarity>;
