import { z } from "zod"; // is needed to use z.object to define the schema

/*
    This is an example of a publicationBase schema, you can create your own schemas
    to define the structure of the data that you are going to use in your publications
    and then use the z.infer<typeof publicationBaseSch> to get the type of the schema
    and use it in your publications
*/

// Here you define the schema of the parameters of the publication (will be validated)
export const paramPublicationExampleSch = z.object({
	responsable: z.string().optional(),
	date: z.string().optional()
});

// Here you define the schema of the return of each document on the publication (will be validated)
export const returnPublicationExampleSch = z.object({
	_id: z.string(),
	name: z.string()
});

// The types exports are needed to integrates with typescript
export type ParamPublicationExampleType = z.infer<typeof paramPublicationExampleSch>;
export type ReturnPublicationExampleType = z.infer<typeof returnPublicationExampleSch>;
