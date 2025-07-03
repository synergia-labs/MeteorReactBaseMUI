import { z } from "zod";

export const microsoftServiceDataSchema = z.object({
	email: z.string().email().optional(),
	id: z.string().optional(),
	displayName: z.string().optional(),
	givenName: z.string().nullable().optional(),
	surname: z.string().nullable().optional(),
	mail: z.string().nullable().optional(),
	userPrincipalName: z.string().optional(),
	businessPhones: z.array(z.string()).optional(),
	jobTitle: z.string().nullable().optional(),
	mobilePhone: z.string().nullable().optional(),
	officeLocation: z.string().nullable().optional(),
	preferredLanguage: z.string().nullable().optional(),
	onPremisesExtensionAttributes: z
		.object({
			extensionAttribute1: z.string().nullable().optional(),
			extensionAttribute2: z.string().nullable().optional(),
			extensionAttribute3: z.string().nullable().optional(),
			extensionAttribute4: z.string().nullable().optional(),
			extensionAttribute5: z.string().nullable().optional(),
			extensionAttribute6: z.string().nullable().optional(),
			extensionAttribute7: z.string().nullable().optional(),
			extensionAttribute8: z.string().nullable().optional(),
			extensionAttribute9: z.string().nullable().optional(),
			extensionAttribute10: z.string().nullable().optional(),
			extensionAttribute11: z.string().nullable().optional(),
			extensionAttribute12: z.string().nullable().optional(),
			extensionAttribute13: z.string().nullable().optional(),
			extensionAttribute14: z.string().nullable().optional(),
			extensionAttribute15: z.string().nullable().optional()
		})
		.optional()
});

export type MicrosoftServiceDataType = z.infer<typeof microsoftServiceDataSchema>;
