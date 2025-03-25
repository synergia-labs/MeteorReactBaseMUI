import { enumExampleMethods } from "../common/enums/methods";
import { enumExamplePublications } from "../common/enums/publication";
import { enumExampleSettings } from "../common/enums/settings";
import { ExampleApiMethodsType } from "../common/interfaces/methods";
import { IExampleApiPublication } from "../common/interfaces/publications";
import ApiBase from "/imports/base/api/api.base";
import { MongoBase } from "/imports/base/database/mongo.base";

class ExampleApi extends ApiBase {
	public mongo = new MongoBase(enumExampleSettings.MODULE_NAME);

	constructor() {
		super(enumExampleMethods, enumExamplePublications);
	}
}

export type ExampleApiType = ExampleApi & ExampleApiMethodsType & IExampleApiPublication;
const exampleApi = new ExampleApi() as ExampleApiType;
export default exampleApi;
