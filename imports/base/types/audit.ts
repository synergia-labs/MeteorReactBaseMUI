import { z } from 'zod';
import { ServerActionsSch } from './serverParams';

export const AuditSch = z.object({
	createdBy: z.string().optional(),
	createdAt: z.date().optional(),

	updatedBy: z.string().optional(),
	updatedAt: z.date().optional(),

	isDeleted: z.boolean().optional(),
	deletedBy: z.string().optional(),
	deletedAt: z.date().optional()
});

export type AuditType = z.infer<typeof AuditSch>;
