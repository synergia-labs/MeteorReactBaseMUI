import { z } from "zod";

enum enumMethodTypesRef {
	METHOD = "method",
	PUBLICATION = "publication",
	MODULE = "module",
	SCREEN = "screen"
}

export const enumMethodTypes = z.nativeEnum(enumMethodTypesRef);
export type MethodType = z.infer<typeof enumMethodTypes>;
