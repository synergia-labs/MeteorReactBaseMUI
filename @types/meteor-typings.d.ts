// src/meteor-typings.d.ts
declare module 'meteor/ostrio:files' {
	import { Mongo } from 'meteor/mongo';

	export class FilesCollection {
		constructor(options?: any);
		insert(doc: any, callback?: Function): string;
		remove(selector: any): void;
		find(selector?: any, options?: any): Mongo.Cursor<any>;
		findOne(selector?: any, options?: any): any;
	}
}
