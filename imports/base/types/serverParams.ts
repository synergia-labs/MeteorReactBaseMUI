import { z } from 'zod';

enum ActionsEnum {
	GET = 'get',
	CREATE = 'create',
	UPDATE = 'update',
	DELETE = 'delete'
}

enum EndpointTypesEnum {
	GET = 'get',
	POST = 'post'
}

export const enumServerActions = z.nativeEnum(ActionsEnum);
export type ServerActions = z.infer<typeof enumServerActions>;

export const enumEndpointType = z.nativeEnum(EndpointTypesEnum);
export type EndpointType = z.infer<typeof enumEndpointType>;
