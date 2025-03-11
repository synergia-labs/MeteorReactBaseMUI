import { IContext } from '/imports/typings/IContext';

export type MethodType<MethodBase extends { execute: (...args: any) => any }> = (
	params?: Parameters<MethodBase['execute']>[0],
	_context?: IContext
) => ReturnType<MethodBase['execute']>;
