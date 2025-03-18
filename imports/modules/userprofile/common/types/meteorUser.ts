import { z } from "zod";
import EnumUserRoles from "/imports/modules/userprofile/common/enums/enumUserRoles";
import { AuditSch } from "/imports/base/types/audit";
import { githubServiceDataSchema } from "./serviceGithubData";
import { googleServiceDataSchema } from "./serviceGoogleData";

export const userProfileSchema = AuditSch.extend({
  photo: z.string().optional(),
  phone: z.string().optional(),
  name: z.string(),
  roles: z.array(z.string()).default([EnumUserRoles.USER]),
  connected: z.boolean().default(false).optional(),
  lastAccess: z.date().optional(),
});

export const userServicesSchema = z.object({
  password: z.object({
    bcrypt: z.string(),
  }).optional(),
  email: z.object({
    verificationTokens: z.array(
      z.object({
        token: z.string(),
        address: z.string().email(),
        when: z.date(),
      })
    ),
  }).optional(),
  github: githubServiceDataSchema.optional(),
  google: googleServiceDataSchema.optional(),
});

export const meteorUserSchema = z.object({
  _id: z.string().nonempty(),
  createdAt: z.date().optional(),
  username: z.string().optional(),
  emails: z.array(
    z.object({
      address: z.string().email(),
      verified: z.boolean(),
    })
  ),
  profile: userProfileSchema.optional(),
  services: userServicesSchema.optional(),
});


export type UserProfileType = z.infer<typeof userProfileSchema>;
export type UserServiceType = z.infer<typeof userServicesSchema>;
export type MeteorUserType = z.infer<typeof meteorUserSchema>;