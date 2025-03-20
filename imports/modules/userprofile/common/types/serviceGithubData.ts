import { z } from 'zod';

export const githubServiceDataSchema = z.object({
	accessToken: z.string().nonempty(),
	avatar: z.string().url(),
	bio: z.string().optional(),
	blog: z.string().optional(),
	company: z.string().optional(),
	email: z.string().email(),
	emails: z
		.array(
			z.object({
				email: z.string().email(),
				verified: z.boolean(),
				primary: z.boolean(),
				visibility: z.enum(['public', 'private']).nullable().optional()
			})
		)
		.optional(),
	id: z.number().int().positive(),
	location: z.string().optional(),
	username: z.string().nonempty()
});

export type ServiceGithubDataType = z.infer<typeof githubServiceDataSchema>;
