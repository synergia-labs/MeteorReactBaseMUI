import enumExampleRegisterMethods from "../../common/enums/enumRegisterMethods";
import enumExampleRegisterPublications from "../../common/enums/enumRegisterPublications";
import { ExampleApiMethodsType } from "../../common/interfaces/methods";
import ApiBase from "../../../../base/api/api.base";
import { MongoBase } from "/imports/base/database/mongo.base";
import enumExampleSettings from "../../common";

class ExampleApi extends ApiBase {
	public mongoInstance: MongoBase;

	constructor() {
		super(enumExampleRegisterMethods, enumExampleRegisterPublications);
		this.mongoInstance = new MongoBase(enumExampleSettings.MODULE_NAME);
	}
}

type TesteType = ExampleApiMethodsType & ExampleApi;

const exampleApi = new ExampleApi() as TesteType;
export default exampleApi;
export type { TesteType as ExampleApi };
