import { z } from "zod";
import EnumUserRoles from "/imports/modules/userprofile/common/enums/enumUserRoles";
import { AuditSch } from "/imports/base/types/audit";

export const UserProfileSchema = AuditSch.extend({
  photo: z.string().optional(),
  phone: z.string().optional(),
  name: z.string(),
  roles: z.array(z.string()).default([EnumUserRoles.USER]),
  connected: z.boolean().default(false),
  lastAccess: z.date().optional(),
});

export type IUserProfile = z.infer<typeof UserProfileSchema>;
