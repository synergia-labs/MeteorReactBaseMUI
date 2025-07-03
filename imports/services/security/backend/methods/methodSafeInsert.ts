import { enumSecurityMethods } from "../../common/enums/methods";
import {
	paramMethodSafeInsertSch,
	ParamMethodSafeInsertType,
	returnMethodSafeInsertSch,
	ReturnMethodSafeInsertType
} from "../../common/types/methodSafeInsert";
import { SecurityServer } from "../security.server";
import { CreateMethodBase } from "/imports/base/server/methods/create.method.base";
import { AuditType } from "../../../../types/audit";
import { textNormalize } from "/imports/libs/textUtilities";
import { IContext } from "../../../../types/context";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

class MethodSafeInsert extends CreateMethodBase<SecurityServer, ParamMethodSafeInsertType, ReturnMethodSafeInsertType> {
	constructor() {
		super({
			name: enumSecurityMethods.methodSafeInsert,
			paramSch: paramMethodSafeInsertSch,
			returnSch: returnMethodSafeInsertSch,
			canRegister: false,
			roles: [enumUserRoles.ADMIN]
		});
	}

	protected async onError(
		_param: ParamMethodSafeInsertType & AuditType,
		_context: IContext,
		_error: unknown
	): Promise<void> {
		this.generateError({ key: "", error: _error }, _context);
	}

	protected async beforeAction(param: ParamMethodSafeInsertType & AuditType, _context: IContext): Promise<void> {
		param._id = `${param.referred}.${textNormalize(param.name)}`;
		await super.beforeAction(param, _context);
	}

	async action(_param: ParamMethodSafeInsertType & AuditType, _context: IContext): Promise<ReturnMethodSafeInsertType> {
		const methodCollection = this.getServerInstance(_context).getMethodCollection();
		const method = await methodCollection.findOneAsync({ _id: _param._id });
		if (method)
			this.generateError(
				{ key: "methodAlreadyExists", params: { method: method.name }, namespace: "SecurityService" },
				_context
			);
		_param.isProtected = _param.isProtected ?? false;
		const result = await methodCollection.insertAsync(_param);
		return { _id: result };
	}
}

export const methodSafeInsert = new MethodSafeInsert();
