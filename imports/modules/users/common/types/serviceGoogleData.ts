import { z } from "zod";

export const googleServiceDataSchema = z.object({
	accessToken: z.string().nonempty(),
	idToken: z.string().nonempty(),
	scope: z.array(z.string()),
	expiresAt: z.number().int(),
	id: z.string().nonempty(),
	email: z.string().email(),
	verified_email: z.boolean(),
	name: z.string().nonempty(),
	given_name: z.string().nonempty(),
	family_name: z.string().nonempty(),
	picture: z.string().url()
});

export type GoogleServiceDataType = z.infer<typeof googleServiceDataSchema>;
