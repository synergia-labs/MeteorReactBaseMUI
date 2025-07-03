import { z } from "zod";
import { Configuration as ServiceConfig } from "meteor/service-configuration";

const getAccessTokenSchema = z.object({
	code: z.string().optional(),
	tenantId: z.string().optional(),
	serviceConfig: z.custom<ServiceConfig>((data) => data instanceof Object).optional(),
	scopes: z.array(z.string()).optional()
});

type GetEntraAccessTokenType = z.infer<typeof getAccessTokenSchema>;

export default GetEntraAccessTokenType;
export { getAccessTokenSchema };
