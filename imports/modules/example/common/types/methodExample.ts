import { z } from "zod"; // is needed to use z.object to define the schema
/*
    This is an example of a methodExample schema, you can create your own schemas
    to define the structure of the data that you are going to use in your methods
    and then use the z.infer<typeof methodExampleSch> to get the type of the schema
    and use it in your methods
*/

// Here you define the schema of the parameters of the method (will be validated)
export const paramMethodExampleSch = z.object({
	name: z.string(),
	description: z.string()
});

// Here you define the schema of the return of the method (will be validated)
export const returnMethodExampleSch = z.object({
	_id: z.string()
});

// The types exports are needed to integrates with typescript
export type ParamMethodExampleType = z.infer<typeof paramMethodExampleSch>;
export type ReturnMethodExampleType = z.infer<typeof returnMethodExampleSch>;
