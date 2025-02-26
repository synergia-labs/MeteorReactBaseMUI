import fillDatabaseWithFakeDataInstance from "./methods/fillDatabaseWithFakeData.callMethod";
import exampleListPublicationInstance from "./publications/exampleList.publication";
import { MongoBase } from "/imports/base/database/mongo.base";
import { MethodBase } from "/imports/base/server/methods/method.base";
import { MethodTypeAsync } from "/imports/base/server/server.base";
import ProductServerBase from "/imports/base/server/server.product";

/**Array com as instâncias de todas as classes de método do módulo */
const _methodInstances: Array<MethodBase<any, any, any>> = [
	fillDatabaseWithFakeDataInstance,
] as const;

/**Array com as instâncias de todas as classes de publicação do módulo */
const _publicationInstances: Array<any> = [
	exampleListPublicationInstance,
] as const;

/**Interface para utilização da classe módulo nos métodos.
 * IMPORTANTE: Adicionar apenas os métodos. Não adicionar publicações.
 */
interface ExampleServerWithMethods extends ExampleServer {
	fillDatabaseWithFakeDataInstance: MethodTypeAsync<void, void>;
}

class ExampleServer extends ProductServerBase {
	mongoInstance?: MongoBase<{}>;
	storageInstance?: any;

	constructor() {
		super('example');
		this.mongoInstance = new MongoBase<{}>('example', {});

		this.registerMethods(_methodInstances, this);
		this._autoRegisterPublications(_publicationInstances, this);
	}
}

const exampleServer = new ExampleServer();
export default exampleServer;
export type { ExampleServerWithMethods as ExampleServer  };
