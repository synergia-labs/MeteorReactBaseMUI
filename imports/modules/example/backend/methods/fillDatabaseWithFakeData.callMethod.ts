import exampleRegisterActions from '../../common/enums/enumRegisterMethods';
import { ExampleServer } from '../server';
import MethodBase from '/imports/base/server/methods/method.base';
import { IContext } from '/imports/typings/IContext';

class FillDatabaseWithFakeData extends MethodBase<ExampleServer, void, number> {
	constructor() {
		super({ name: exampleRegisterActions.fillDatabaseWithFakeData, endpointType: 'post' });
	}

	async action(_prop: void, _context: IContext): Promise<number> {
		const totalOfDocuments = await this.getServerInstance()?.mongoInstance?.getCollectionInstance().find().countAsync();
		console.log('totalOfDocuments', totalOfDocuments);

		return totalOfDocuments || 0;
	}
}

const fillDatabaseWithFakeDataInstance = new FillDatabaseWithFakeData();
export default fillDatabaseWithFakeDataInstance;
