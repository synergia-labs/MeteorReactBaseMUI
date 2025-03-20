import { IArchive } from "/imports/base/services/storage/common/types/archive.type";
import { Mongo } from "meteor/mongo";

// src/meteor-typings.d.ts
declare module "meteor/ostrio:files" {
	export class FilesCollection {
		constructor(options?: any);
		collection: Mongo.Collection<any>;
		// eslint-disable-next-line
		insert(doc: any, callback?: Function): string;
		remove(selector: any): void;
		find(selector?: any, options?: any): Mongo.Cursor<any>;
		findOneAsync(selector?: any, options?: any): Promise<IArchive>;
		removeAsync(selector: any): Promise<void>;
		// eslint-disable-next-line
		write(buffer: Buffer, options: any, callback?: Function): any;
	}
}
