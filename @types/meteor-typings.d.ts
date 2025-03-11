// src/meteor-typings.d.ts
declare module 'meteor/ostrio:files' {
	import { Mongo } from 'meteor/mongo';

	export class FilesCollection {
		constructor(options?: any);
		collection: Mongo.Collection<any>;
		insert(doc: any, callback?: Function): string;
		remove(selector: any): void;
		find(selector?: any, options?: any): Mongo.Cursor<any>;
		findOneAsync(selector?: any, options?: any): Promise<IArchive>;
		write(buffer: Buffer, options: any, callback?: Function): any;
	}
}

declare module 'meteor/meteor' {
	namespace Meteor {
		interface UserProfile {
			email: string;
		}
	}
}

