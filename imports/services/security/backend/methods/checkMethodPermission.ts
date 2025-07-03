import { enumSecurityConfig } from "../../common/enums/config";
import { enumSecurityMethods } from "../../common/enums/methods";
import {
	paramCheckPermissionSch,
	ParamCheckPermissionType,
	returnCheckPermissionSch,
	ReturnCheckPermissionType
} from "../../common/types/checkPermission";
import { SecurityServer } from "../security.server";
import { _checkPermission } from "../utils/checkPermission";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

class CheckMethodPermission extends MethodBase<SecurityServer, ParamCheckPermissionType, ReturnCheckPermissionType> {
	constructor() {
		super({
			name: enumSecurityMethods.checkMethodPermission,
			roles: [enumUserRoles.PUBLIC],
			paramSch: paramCheckPermissionSch,
			returnSch: returnCheckPermissionSch
		});
	}

	async action(_param: ParamCheckPermissionType, _context: IContext): Promise<ReturnCheckPermissionType> {
		const { names, referred } = _param;

		const result: ReturnCheckPermissionType = {};

		for (const name of names) {
			result[name] = await _checkPermission(name, referred ?? enumSecurityConfig.API_NAME, _context);
		}

		return result;
	}
}

export const checkMethodPermission = new CheckMethodPermission();
