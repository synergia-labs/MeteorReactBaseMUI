import { z } from "zod";

export const IDocSchema = z.object({
  _id: z.string().optional(),
  createdat: z.date().optional(),
  updatedby: z.string().optional(),
  createdby: z.string().optional(),
  lastupdate: z.date().optional(),
  sincronizadoEm: z.date().optional(),
  needSync: z.boolean().optional(),
});

export type IDoc = z.infer<typeof IDocSchema>;
