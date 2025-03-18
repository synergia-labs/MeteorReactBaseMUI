import { z } from 'zod';

enum enumMethodTypesRef {
	METHOD = 'method',
	PUBLICATION = 'publication',
	MODULE = 'module'
}

export const enumMethodTypes = z.nativeEnum(enumMethodTypesRef);
export type MethodTypes = z.infer<typeof enumMethodTypes>;
