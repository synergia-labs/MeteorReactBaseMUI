import fillDatabaseWithFakeDataInstance from "./methods/fillDatabaseWithFakeData.callMethod";
import { MongoBase } from "/imports/base/database/mongo.base";
import { MethodBase } from "/imports/base/server/methods/method.base";
import { MethodTypeAsync } from "/imports/base/server/server.base";
import ProductServerBase from "/imports/base/server/server.product";

const _methodInstances: Array<MethodBase<any, any, any>> = [
	fillDatabaseWithFakeDataInstance,
] as const;

interface ExampleServerWithMethods extends ExampleServer {
	fillDatabaseWithFakeDataInstance: MethodTypeAsync<void, void>;
}

class ExampleServer extends ProductServerBase {
	mongoInstance?: MongoBase<{}>;
	storageInstance?: any;

	constructor() {
		super('example');
		this.mongoInstance = new MongoBase<{}>('example', {});

		this._autoRegisterMethods(_methodInstances, this);
	}
}

const exampleServer = new ExampleServer();
export default exampleServer;
export type { ExampleServerWithMethods as ExampleServer  };
