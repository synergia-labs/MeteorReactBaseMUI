import { z } from 'zod';

export const ServerActionsSch = z.enum(['get', 'create', 'update', 'delete']);
export type ServerActions = z.infer<typeof ServerActionsSch>;

export const EndpointTypeSch = z.enum(['get', 'post']);
export type EndpointType = z.infer<typeof EndpointTypeSch>;
