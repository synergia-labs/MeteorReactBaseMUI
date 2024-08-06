import { Meteor } from 'meteor/meteor';
import { ServerApiBase } from './serverBase';
import { IBaseOptions } from '../typings/IBaseOptions';
import { IDoc } from '../typings/IDoc';
import { ISchema } from '../typings/ISchema';

export class ProductServerBase<Doc extends IDoc> extends ServerApiBase<any> {
	constructor(apiName: string, apiSch: ISchema<Doc>, options?: IBaseOptions) {
		super(apiName, apiSch, options);

		this.serverGetImageThumbnail = this.serverGetImageThumbnail.bind(this);
	}

	serverGetImageThumbnail(field: string, _id: string, date: Date = new Date()) {
		return `${Meteor.absoluteUrl()}thumbnail/${this.collectionName}/${field}/${_id}?date=${date.toISOString()}`;
	}
}
