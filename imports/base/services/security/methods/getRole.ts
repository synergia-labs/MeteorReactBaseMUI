import { paramGetArchiveSch } from '../../storage/common/types/getArchive';
import { enumSecurityConfig } from '../common/enums/config.enum';
import { enumSecurityMethods } from '../common/enums/methods.enum';
import { ParamGetType, returnGetRoleSch, ReturnGetRoleType } from '../common/types/get';
import { SecurityServer } from '../security.server';
import MethodBase from '/imports/base/server/methods/method.base';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';

class GetRole extends MethodBase<SecurityServer, ParamGetType, ReturnGetRoleType> {
	constructor() {
		super({
			name: enumSecurityMethods.getRole,
			paramSch: paramGetArchiveSch,
			returnSch: returnGetRoleSch,
			roles: [EnumUserRoles.ADM]
		});
	}

	protected onError(_param: ParamGetType, _context: any, _error: Error): void {
		throw new Meteor.Error('500', _error.message);
	}

	async action(_param: ParamGetType, _context: any): Promise<ReturnGetRoleType> {
		const roleCollection = this.getServerInstance()?.getRoleCollection();
		if (!roleCollection) throw new Error('Role collection not found');

		const _id = `${_param.referred ?? enumSecurityConfig.apiName}.${_param.name}`;
		const role = await roleCollection.findOneAsync({ _id });
		if (!role) throw new Error('Role not found');

		return role;
	}
}

export const getRole = new GetRole();
