import { paramGetArchiveSch } from "../../../storage/common/types/getArchive";
import { enumSecurityConfig } from "../../common/enums/config";
import { enumSecurityMethods } from "../../common/enums/methods";
import { ParamGetType, returnGetRoleSch, ReturnGetRoleType } from "../../common/types/get";
import { SecurityServer } from "../security.server";
import MethodBase from "/imports/base/server/methods/method.base";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

class GetRole extends MethodBase<SecurityServer, ParamGetType, ReturnGetRoleType> {
	constructor() {
		super({
			name: enumSecurityMethods.getRole,
			paramSch: paramGetArchiveSch,
			returnSch: returnGetRoleSch,
			roles: [enumUserRoles.ADMIN]
		});
	}

	async action(_param: ParamGetType, _context: any): Promise<ReturnGetRoleType> {
		const roleCollection = this.getServerInstance(_context).getRoleCollection();

		const _id = `${_param.referred ?? enumSecurityConfig.API_NAME}.${_param.name}`;
		const role = await roleCollection.findOneAsync({ _id });
		if (!role) this.generateError({ key: "roleNotFound" }, _context);

		return role;
	}
}

export const getRole = new GetRole();
