import { z } from 'zod';

export const AuditSch = z.object({
	_id: z.string().optional(),
	createdBy: z.string().optional(),
	createdAt: z.date().optional(),

	updatedBy: z.string().optional(),
	updatedAt: z.date().optional(),

	isDeleted: z.boolean().optional(),
	deletedBy: z.string().optional(),
	deletedAt: z.date().optional()
});

export type AuditType = z.infer<typeof AuditSch>;
