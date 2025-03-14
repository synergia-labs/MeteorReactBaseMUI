import { paramGetArchiveSch } from '../../storage/common/types/getArchive';
import { enumSecurityConfig } from '../common/enums/config.enum';
import { enumSecurityMethods } from '../common/enums/methods.enum';
import { ParamGetType, returnGetMethodSch, ReturnGetMethodType } from '../common/types/get';
import { SecurityServer } from '../security.server';
import MethodBase from '/imports/base/server/methods/method.base';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';

class GetMethod extends MethodBase<SecurityServer, ParamGetType, ReturnGetMethodType> {
	constructor() {
		super({
			name: enumSecurityMethods.getMethod,
			paramSch: paramGetArchiveSch,
			returnSch: returnGetMethodSch,
			roles: [EnumUserRoles.ADM]
		});
	}

	protected onError(_param: ParamGetType, _context: any, _error: Error): void {
		throw new Meteor.Error('500', _error.message);
	}

	async action(_param: ParamGetType, _context: any): Promise<ReturnGetMethodType> {
		const methodCollection = this.getServerInstance()?.getMethodCollection();
		if (!methodCollection) throw new Error('Method collection not found');

		const _id = `${_param.referred ?? enumSecurityConfig.apiName}.${_param.name}`;
		const method = await methodCollection.findOneAsync({ _id });
		if (!method) throw new Error('Method not found');

		return method;
	}
}

export const getMethod = new GetMethod();
