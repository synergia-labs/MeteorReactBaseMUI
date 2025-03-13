import ApiBase from '../../api/api.base';
import { enumSecurityMethods } from './common/enums/methods.enum';
import { SecurityApiMethods } from './common/interfaces/methods';

class SecurityApi extends ApiBase {
	constructor() {
		super(enumSecurityMethods, {});
	}
}

export type SecurityApiType = SecurityApi & SecurityApiMethods;

const securityApi = new SecurityApi() as SecurityApiType;
export default securityApi;
