declare module 'meteor/ostrio:files' {
	export class FilesCollection {
		constructor(options: Record<string, unknown>);
		collection: any;
		findOne(selector: any): any;
		removeAsync(selector: any): Promise<number>;
		[key: string]: any;
	}
}
