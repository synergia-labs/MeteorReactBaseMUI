import { z } from "zod";
import { Group } from "@microsoft/microsoft-graph-types";

const getAzureGroupListParamSchema = z.object({
	tenantId: z.string().optional(),
	accessToken: z.string().optional(),
	select: z.array(z.string()).optional(),
	count: z.boolean().optional(),
	top: z.number().optional(),
	nextLink: z.string().optional(),
	orderBy: z.string().optional(),
	includeTotalMembers: z.boolean().optional(),
	searchTerm: z.string().optional()
});

const getAzureGroupListReturnSchema = z.object({
	groups: z.array(z.any()).optional(),
	total: z.number().optional(),
	nextLink: z.string().optional(),
	totalMembers: z.number().optional()
});

type GetAzureGroupListReturnType = Omit<z.infer<typeof getAzureGroupListReturnSchema>, "groups"> & {
	groups?: Array<Partial<Group & { totalMembers?: number }>>;
};

type GetAzureGroupListParamType = Omit<z.infer<typeof getAzureGroupListParamSchema>, "select" | "orderBy"> & {
	select?: Array<keyof Group>;
	orderBy?: keyof Group;
};
export {
	GetAzureGroupListParamType,
	GetAzureGroupListReturnType,
	getAzureGroupListParamSchema,
	getAzureGroupListReturnSchema
};
