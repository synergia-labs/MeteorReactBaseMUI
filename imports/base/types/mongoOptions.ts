import { z } from "zod";

export const mongoOptionsSch = z
	.object({
		sort: z.record(z.string(), z.union([z.number(), z.literal(1), z.literal(-1)])).optional(),
		skip: z.number().optional(),
		limit: z.number().optional(),
		fields: z.record(z.string(), z.boolean()).optional(),
		hint: z.any().optional(), // Pode ser um índice específico do MongoDB
		reactive: z.boolean().optional(),
		transform: z.function().optional()
	})
	.optional();

export type MongoOptionsType = z.infer<typeof mongoOptionsSch>;
