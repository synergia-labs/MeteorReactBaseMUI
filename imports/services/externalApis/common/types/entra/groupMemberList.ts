import { z } from "zod";
import { User } from "@microsoft/microsoft-graph-types";

const getAzureGroupMembersListParamSchema = z.object({
	groupId: z.string(),
	tenantId: z.string().optional(),
	accessToken: z.string().optional(),
	select: z.array(z.string()).optional(),
	count: z.boolean().optional(),
	top: z.number().optional(),
	nextLink: z.string().optional(),
	orderBy: z.string().optional(),
	searchTerm: z.string().optional(),
	includePhoto: z.boolean().optional()
});

const getAzureGroupMembersListReturnSchema = z.object({
	users: z.array(z.any()).optional(),
	total: z.number().optional(),
	nextLink: z.string().optional()
});

type GetAzureGroupMembersListReturnType = Omit<z.infer<typeof getAzureGroupMembersListReturnSchema>, "users"> & {
	users?: Array<Partial<User & { photo?: Buffer<ArrayBuffer> | undefined }>>;
};

type GetAzureGroupMembersListParamType = Omit<
	z.infer<typeof getAzureGroupMembersListParamSchema>,
	"select" | "orderBy"
> & {
	select?: Array<keyof User | "*">;
	orderBy?: keyof User;
};
export {
	GetAzureGroupMembersListParamType,
	GetAzureGroupMembersListReturnType,
	getAzureGroupMembersListParamSchema,
	getAzureGroupMembersListReturnSchema
};
