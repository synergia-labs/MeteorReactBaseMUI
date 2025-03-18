import { enumSecurityConfig } from '../../common/enums/config.enum';
import { enumSecurityMethods } from '../../common/enums/methods.enum';
import {
	paramCheckPermissionSch,
	ParamCheckPermissionType,
	returnCheckPermissionSch,
	ReturnCheckPermissionType
} from '../../common/types/checkPermission';
import { SecurityServer } from '../security.server';
import { _checkPermission } from '../utils/checkPermission';
import MethodBase from '/imports/base/server/methods/method.base';
import EnumUserRoles from '/imports/modules/userprofile/common/enums/enumUserRoles';
import { IContext } from '/imports/typings/IContext';

class CheckMethodPermission extends MethodBase<SecurityServer, ParamCheckPermissionType, ReturnCheckPermissionType> {
	constructor() {
		super({
			name: enumSecurityMethods.checkMethodPermission,
			description: 'Check if user has permission to execute a method',
			roles: [EnumUserRoles.PUBLIC],
			paramSch: paramCheckPermissionSch,
			returnSch: returnCheckPermissionSch
		});
	}

	async action(_param: ParamCheckPermissionType, _context: IContext): Promise<ReturnCheckPermissionType> {
		const { names, referred } = _param;

		const result: ReturnCheckPermissionType = {};

		for (const name of names) {
			result[name] = await _checkPermission(name, referred ?? enumSecurityConfig.apiName, _context);
		}

		return result;
	}
}

export const checkMethodPermission = new CheckMethodPermission();
