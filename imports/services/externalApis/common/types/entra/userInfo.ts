import { z } from "zod";
import { User } from "@microsoft/microsoft-graph-types";

const getAzureUserInfoParamSchema = z.object({
	tenantId: z.string().optional(),
	accessToken: z.string().optional(),
	userId: z.string().optional(),
	select: z.array(z.string()).optional()
});

type GetAzureUserInfoParamType = Omit<z.infer<typeof getAzureUserInfoParamSchema>, "select"> & {
	select?: Array<keyof User>;
};
export { GetAzureUserInfoParamType, getAzureUserInfoParamSchema };
