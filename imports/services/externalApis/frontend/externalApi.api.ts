import { enumExternalApiServiceMethods } from "../common/enums/methods";
import { ExternalApiMethodsType } from "../common/interfaces/methods";
import ApiBase from "/imports/base/api/api.base";

class ExternalApiServiceApi extends ApiBase {
	constructor() {
		super(enumExternalApiServiceMethods, {});
	}
}

export type ExternalApiServiceApiType = ExternalApiServiceApi & ExternalApiMethodsType;

const externalApiServiceApi = new ExternalApiServiceApi() as ExternalApiServiceApiType;
export default externalApiServiceApi;
