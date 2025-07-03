import { z } from "zod";
import { User } from "@microsoft/microsoft-graph-types";

const getAzureUserListParamSchema = z.object({
	tenantId: z.string().optional(),
	accessToken: z.string().optional(),
	select: z.array(z.string()).optional(),
	count: z.boolean().optional(),
	top: z.number().optional(),
	nextLink: z.string().optional()
});

const getAzureUserListReturnSchema = z.object({
	users: z.array(z.any()).optional(),
	total: z.number().optional(),
	nextLink: z.string().optional()
});

type GetAzureUserListReturnType = Omit<z.infer<typeof getAzureUserListReturnSchema>, "users"> & {
	users?: Array<Partial<User>>;
};

type GetAzureUserListParamType = Omit<z.infer<typeof getAzureUserListParamSchema>, "select"> & {
	select?: Array<keyof User>;
};
export {
	GetAzureUserListParamType,
	GetAzureUserListReturnType,
	getAzureUserListParamSchema,
	getAzureUserListReturnSchema
};
