import { enumSecurityConfig } from '../common/enums/config.enum';
import { enumSecurityMethods } from '../common/enums/methods.enum';
import {
	paramCheckPermissionSch,
	ParamCheckPermissionType,
	returnCheckPermissionSch,
	ReturnCheckPermissionType
} from '../common/types/checkPermission';
import { SecurityServer } from '../security.server';
import MethodBase from '/imports/base/server/methods/method.base';
import { hasValue } from '/imports/libs/hasValue';
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

	private _checkPermission(name: string, referred: string, _context: IContext): boolean {
		const server = this.getServerInstance()?.getMethodCollection();
		if (!server) throw new Error('Method collection not found');

		const method = server.findOne({ name: name, referred: referred });
		if (!method) throw new Error('Method not found');

		let module = server.findOne({ name: name.split('.')[0], referred: referred });
		if (!module) module = server.findOne({ name: name.split('.')[0], referred: enumSecurityConfig.apiName });
		if (!hasValue(module)) throw new Error('Module not found');

		if (
			(!hasValue(method.roles) || method.roles.length === 0 || method.roles.includes(EnumUserRoles.PUBLIC)) &&
			(!hasValue(module.roles) || module.roles.length === 0 || module.roles.includes(EnumUserRoles.PUBLIC))
		)
			return true;

		const user = _context.user ?? Meteor.user();
		if (!hasValue(user) || !hasValue(user.profile?.roles)) return false;

		return (
			module.roles.some((role: string) => user.profile!.roles.includes(role)) &&
			method.roles.some((role: string) => user.profile!.roles.includes(role))
		);
	}

	action(_param: ParamCheckPermissionType, _context: IContext): Promise<ReturnCheckPermissionType> {
		const { names, referred } = _param;

		const result: ReturnCheckPermissionType = {};

		names.forEach((name) => {
			result[name] = this._checkPermission(name, referred ?? enumSecurityConfig.apiName, _context);
		});

		return Promise.resolve(result);
	}
}

export const checkMethodPermission = new CheckMethodPermission();
