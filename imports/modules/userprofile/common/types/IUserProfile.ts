import { z } from "zod";
import EnumUserRoles from "/imports/modules/userprofile/common/enums/enumUserRoles";
import { AuditSch } from "/imports/base/types/audit";

export const UserProfileSchema = AuditSch.extend({
  photo: z.string().optional(),
  phone: z.string().optional(),
  name: z.string(),
  role: z.nativeEnum(EnumUserRoles),
  status: z.string().optional(),
});

export type IUserProfile = z.infer<typeof UserProfileSchema>;
