// region Imports
import { ProductBase } from '../../../api/productBase';
import { exampleSch, IExample } from './exampleSch';
import { IMeteorError } from '/imports/typings/IMeteorError';

class ExampleApi extends ProductBase<IExample> {
	constructor() {
		super('example', exampleSch, {
			enableCallMethodObserver: true,
			enableSubscribeObserver: true
		});
	}

	fillDatabae = (limit: number, callback: (error: IMeteorError, result: Array<string>) => void) => 
		this.callMethod('fillDatabae', limit, callback);

	editTasks = (baseName: string, callback: (error: IMeteorError) => void) =>
		this.callMethod('editTasks', baseName, callback);

}

export const exampleApi = new ExampleApi();
