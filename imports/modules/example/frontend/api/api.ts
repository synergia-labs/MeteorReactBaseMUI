import enumExampleRegisterMethods from '../../common/enums/enumRegisterMethods';
import enumExampleRegisterPublications from '../../common/enums/enumRegisterPublications';
import { ExampleApiMethods } from '../../common/interfaces/methods';
import ApiBase from '../../../../base/api/api.base';
import { Mongo } from 'meteor/mongo';
import { MongoBase } from '/imports/base/database/mongo.base';
import EnumExampleSettings from '../../common';

class ExampleApi extends ApiBase {
	public mongoInstance: MongoBase;

	constructor() {
		super(enumExampleRegisterMethods, enumExampleRegisterPublications);
		this.mongoInstance = new MongoBase(EnumExampleSettings.MODULE_NAME);
	}
}

type teste = ExampleApiMethods & ExampleApi;

const exampleApi = new ExampleApi() as teste;
export default exampleApi;
export type { teste as ExampleApi };
