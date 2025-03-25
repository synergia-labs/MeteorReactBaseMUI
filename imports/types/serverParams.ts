import { z } from "zod";

enum enumActions {
	GET = "get",
	CREATE = "create",
	UPDATE = "update",
	DELETE = "delete"
}

enum enumEndpointTypes {
	GET = "get",
	POST = "post"
}

export const enumServerActions = z.nativeEnum(enumActions);
export type ServerActionsType = z.infer<typeof enumServerActions>;

export const enumEndpointType = z.nativeEnum(enumEndpointTypes);
export type EndpointType = z.infer<typeof enumEndpointType>;
