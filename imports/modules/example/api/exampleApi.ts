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

	fillDatabaseWithFakeData = (callback?: (e: IMeteorError, r: boolean) => void) =>
		this.callMethod('fillDatabaseWithFakeData', {}, callback);
}

export const exampleApi = new ExampleApi();
