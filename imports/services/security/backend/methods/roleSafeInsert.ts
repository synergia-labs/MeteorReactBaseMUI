import { enumSecurityMethods } from "../../common/enums/methods";
import {
	paramRoleSafeInsertSch,
	ParamRoleSafeInsertType,
	returnRoleSafeInsertSch,
	ReturnRoleSafeInsertType
} from "../../common/types/roleSafeInsert";
import { SecurityServer } from "../security.server";
import { CreateMethodBase } from "/imports/base/server/methods/create.method.base";
import { AuditType } from "../../../../types/audit";
import { textNormalize } from "/imports/libs/textUtilities";
import enumUserRoles from "../../../../modules/userprofile/common/enums/enumUserRoles";
import { IContext } from "../../../../types/context";

class RoleSafeInsert extends CreateMethodBase<SecurityServer, ParamRoleSafeInsertType, ReturnRoleSafeInsertType> {
	constructor() {
		super({
			name: enumSecurityMethods.roleSafeInsert,
			paramSch: paramRoleSafeInsertSch,
			returnSch: returnRoleSafeInsertSch,
			roles: [enumUserRoles.ADMIN],
			description: "Insert a new role to a specific referred"
		});
	}

	protected async onError(
		_param: ParamRoleSafeInsertType & AuditType,
		_context: IContext,
		_error: Error
	): Promise<void> {
		this.generateError({ _message: _error.message }, _context);
	}

	async action(_param: ParamRoleSafeInsertType & AuditType, _context: IContext): Promise<ReturnRoleSafeInsertType> {
		const roleCollection = this.getServerInstance()?.getRoleCollection();
		if (!roleCollection) this.generateError({ _message: "Role collection not found" }, _context);

		const _id = `${_param.referred}.${textNormalize(_param.name)}`;
		const role = await roleCollection!.findOneAsync({ _id });

		if (role) this.generateError({ _message: "Role already exists" }, _context);

		const result = await roleCollection!.insertAsync({ _id, ..._param });
		return { _id: result };
	}
}

export const roleSafeInsert = new RoleSafeInsert();
