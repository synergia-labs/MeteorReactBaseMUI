import { paramGetArchiveSch } from "../../../storage/common/types/getArchive";
import { enumSecurityConfig } from "../../common/enums/config";
import { enumSecurityMethods } from "../../common/enums/methods";
import { ParamGetType, returnGetRoleSch, ReturnGetRoleType } from "../../common/types/get";
import { SecurityServer } from "../security.server";
import MethodBase from "/imports/base/server/methods/method.base";
import enumUserRoles from "../../../../modules/userprofile/common/enums/enumUserRoles";

class GetRole extends MethodBase<SecurityServer, ParamGetType, ReturnGetRoleType> {
	constructor() {
		super({
			name: enumSecurityMethods.getRole,
			paramSch: paramGetArchiveSch,
			returnSch: returnGetRoleSch,
			roles: [enumUserRoles.ADMIN],
			description: "Get role by name and referred"
		});
	}

	async action(_param: ParamGetType, _context: any): Promise<ReturnGetRoleType> {
		const roleCollection = this.getServerInstance()?.getRoleCollection();
		if (!roleCollection) this.generateError({ _message: "Role collection not found" }, _context);

		const _id = `${_param.referred ?? enumSecurityConfig.API_NAME}.${_param.name}`;
		const role = await roleCollection!.findOneAsync({ _id });
		if (!role) this.generateError({ _message: "Role not found" }, _context);

		return role;
	}
}

export const getRole = new GetRole();
