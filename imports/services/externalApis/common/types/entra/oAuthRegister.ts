import { z } from "zod";

const azureOAuthRegisterParamSchema = z.object({
	serviceName: z.string(),
	oAuthVersion: z.number()
});

type AzureOAuthRegisterParamType = z.infer<typeof azureOAuthRegisterParamSchema>;
export default AzureOAuthRegisterParamType;
export { azureOAuthRegisterParamSchema };
