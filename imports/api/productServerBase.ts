import { Meteor } from 'meteor/meteor';
import { ServerApiBase } from '/imports/api/serverBase';
import { IBaseOptions } from '/shared/typings/IBaseOptions';
import { IDoc } from '/shared/typings/IDoc';
import { ISchema } from '/shared/typings/ISchema';

export class ProductServerBase<Doc extends IDoc> extends ServerApiBase<any> {
	constructor(apiName: string, apiSch: ISchema<Doc>, options?: IBaseOptions) {
		super(apiName, apiSch, options);

		this.serverGetImageThumbnail = this.serverGetImageThumbnail.bind(this);
	}

	serverGetImageThumbnail(field: string, _id: string, date: Date = new Date()) {
		const path = `${Meteor.absoluteUrl()}thumbnail/${this.collectionName}/${field}/${_id}?date=${date.toISOString()}`;
		return path;
	}
}
