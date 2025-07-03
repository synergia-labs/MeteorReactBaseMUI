import { z } from "zod";

export const returnCreateSch = z.object({
	parent: z.record(z.any()).optional(),
	relationship: z.record(z.any()).optional(),
	node: z.record(z.any()).optional()
});
export type ReturnCreateType = z.infer<typeof returnCreateSch>;
