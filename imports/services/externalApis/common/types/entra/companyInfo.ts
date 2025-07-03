import { z } from "zod";
import { Organization as AzureOrganization } from "@microsoft/microsoft-graph-types";

const getAzureCompanyInfoParamSchema = z.object({
	tenantId: z.string().optional(),
	accessToken: z.string().optional(),
	select: z.array(z.string()).optional()
});

type GetAzureCompanyInfoParamType = Omit<z.infer<typeof getAzureCompanyInfoParamSchema>, "select"> & {
	select?: Array<keyof AzureOrganization>;
};
export { GetAzureCompanyInfoParamType, getAzureCompanyInfoParamSchema };
