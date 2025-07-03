import { z } from "zod";

const validadeTenantIdReturnSchema = z.object({
	isValid: z.boolean(),
	companyName: z.string().optional(),
	validDomainNames: z.string().optional(),
	totalUsers: z.number().optional(),
	totalGroups: z.number().optional()
});

type ValidateTenantIdReturnType = z.infer<typeof validadeTenantIdReturnSchema>;
export default ValidateTenantIdReturnType;
export { validadeTenantIdReturnSchema };
