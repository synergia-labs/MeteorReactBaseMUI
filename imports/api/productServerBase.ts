import { Meteor } from "meteor/meteor";
import { ServerApiBase } from "./serverBase";
import { IBaseOptions } from "../typings/IBaseOptions";
import { DocType } from "../typings/DocType";
import { ISchema } from "../typings/ISchema";

export class ProductServerBase<Doc extends DocType> extends ServerApiBase<Doc> {
	constructor(apiName: string, apiSch: ISchema<Doc>, options?: IBaseOptions) {
		super(apiName, apiSch, options);

		this.serverGetImageThumbnail = this.serverGetImageThumbnail.bind(this);
	}

	serverGetImageThumbnail(field: string, _id: string, date: Date = new Date()) {
		return `${Meteor.absoluteUrl()}thumbnail/${this.collectionName}/${field}/${_id}?date=${date.toISOString()}`;
	}
}
