import { z } from "zod";

export const AuditSch = z.object({
	_id: z.string().optional(),
	createdBy: z.string().optional(),
	createdAt: z.union([z.date(), z.string()]).optional(),

	updatedBy: z.string().optional(),
	updatedAt: z.union([z.date(), z.string()]).optional(),

	isDeleted: z.boolean().optional(),
	deletedBy: z.string().optional(),
	deletedAt: z.union([z.date(), z.string()]).optional()
});

export type AuditType = z.infer<typeof AuditSch>;
