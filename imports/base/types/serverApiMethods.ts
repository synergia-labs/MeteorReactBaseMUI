export type TransformServerToApiMethods<T extends Record<string, (...args: any) => any>> = {
	[K in keyof T]: (
		param: Parameters<T[K]>[0],
		callback: (error: Meteor.Error, result: Awaited<ReturnType<T[K]>>) => void
	) => void;
};
