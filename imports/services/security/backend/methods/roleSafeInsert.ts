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
import { IContext } from "../../../../types/context";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

class RoleSafeInsert extends CreateMethodBase<SecurityServer, ParamRoleSafeInsertType, ReturnRoleSafeInsertType> {
	constructor() {
		super({
			name: enumSecurityMethods.roleSafeInsert,
			paramSch: paramRoleSafeInsertSch,
			returnSch: returnRoleSafeInsertSch,
			roles: [enumUserRoles.ADMIN],
			canRegister: false
		});
	}

	protected async onError(
		_param: ParamRoleSafeInsertType & AuditType,
		_context: IContext,
		_error: unknown
	): Promise<void> {
		this.generateError({ key: "", error: _error }, _context);
	}

	protected async beforeAction(param: ParamRoleSafeInsertType & AuditType, _context: IContext): Promise<void> {
		param._id = `${param.referred}.${textNormalize(param.name)}`;
		await super.beforeAction(param, _context);
	}

	async action(_param: ParamRoleSafeInsertType & AuditType, _context: IContext): Promise<ReturnRoleSafeInsertType> {
		const roleCollection = this.getServerInstance(_context).getRoleCollection();
		const role = await roleCollection.findOneAsync({ _id: _param._id });

		if (role) this.generateError({ key: "roleAlreadyExists", namespace: "SecurityService" }, _context);

		const result = await roleCollection.insertAsync(_param);
		return { _id: result };
	}
}

export const roleSafeInsert = new RoleSafeInsert();
