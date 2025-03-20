import { enumSecurityMethods } from '../../common/enums/methods.enum';
import {
	paramMethodSafeInsertSch,
	ParamMethodSafeInsertType,
	returnMethodSafeInsertSch,
	ReturnMethodSafeInsertType
} from '../../common/types/methodSafeInsert';
import { SecurityServer } from '../security.server';
import { CreateMethodBase } from '/imports/base/server/methods/create.method.base';
import { AuditType } from '/imports/base/types/audit';
import { textNormalize } from '/imports/libs/textUtilities';
import EnumUserRoles from '../../../../../modules/userprofile/common/enums/enumUserRoles';
import { IContext } from '/imports/typings/IContext';

class MethodSafeInsert extends CreateMethodBase<SecurityServer, ParamMethodSafeInsertType, ReturnMethodSafeInsertType> {
	constructor() {
		super({
			name: enumSecurityMethods.methodSafeInsert,
			paramSch: paramMethodSafeInsertSch,
			returnSch: returnMethodSafeInsertSch,
			roles: [EnumUserRoles.ADMIN],
			description: 'Insert a new method to a specific referred'
		});
	}

	protected async onError(
		_param: ParamMethodSafeInsertType & AuditType,
		_context: IContext,
		_error: Error
	): Promise<void> {
		this.generateError({ _message: _error.message }, _context);
	}

	async action(_param: ParamMethodSafeInsertType & AuditType, _context: IContext): Promise<ReturnMethodSafeInsertType> {
		const methodCollection = this.getServerInstance()?.getMethodCollection();
		if (!methodCollection) this.generateError({ _message: 'Method collection not found' }, _context);

		const _id = `${_param.referred}.${textNormalize(_param.name)}`;
		const method = await methodCollection!.findOneAsync({ _id });
		if (method) this.generateError({ _message: 'Method already exists' }, _context);
		_param.isProtected = _param.isProtected ?? false;
		const result = await methodCollection!.insertAsync({ _id, ..._param });
		return { _id: result };
	}
}

export const methodSafeInsert = new MethodSafeInsert();
