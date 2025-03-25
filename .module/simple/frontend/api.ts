import { enumModuleNameMethods } from "../common/enums/methods";
import { enumModuleNamePublications } from "../common/enums/publication";
import { enumModuleNameSettings } from "../common/enums/settings";
import { ModuleNameApiMethodsType } from "../common/interfaces/methods";
import { IModuleNameApiPublication } from "../common/interfaces/publications";
import ApiBase from "/imports/base/api/api.base";
import { MongoBase } from "/imports/base/database/mongo.base";

class ModuleNameApi extends ApiBase {
	public mongo = new MongoBase(enumModuleNameSettings.MODULE_NAME);

	constructor() {
		super(enumModuleNameMethods, enumModuleNamePublications);
	}
}

export type ModuleNameApiType = ModuleNameApi & ModuleNameApiMethodsType & IModuleNameApiPublication;
const moduleNameApi = new ModuleNameApi() as ModuleNameApiType;
export default moduleNameApi;
