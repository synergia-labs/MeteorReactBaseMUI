import ApiBase from "../../api/api.base";
import { enumStorageMethods } from "./common/enums/methods.enum";
import { StorageApiMethodsType } from "./common/interfaces/methods";

class StorageApi extends ApiBase {
	constructor() {
		super(enumStorageMethods, {});
	}
}

export type StorageApiType = StorageApi & StorageApiMethodsType;

const storageApi = new StorageApi() as StorageApiType;
export default storageApi;
