import { enumSecurityMethods } from '../common/enums/methods.enum';
import {
	paramMethodSafeInsertSch,
	ParamMethodSafeInsertType,
	returnMethodSafeInsertSch,
	ReturnMethodSafeInsertType
} from '../common/types/methodSafeInsert';
import { SecurityServer } from '../security.server';
import { CreateMethodBase } from '/imports/base/server/methods/create.method.base';
import { AuditType } from '/imports/base/types/audit';
import { textNormalize } from '/imports/libs/textUtilities';
import EnumUserRoles from '/imports/modules/userprofile/common/enums/enumUserRoles';
import { IContext } from '/imports/typings/IContext';

class MethodSafeInsert extends CreateMethodBase<SecurityServer, ParamMethodSafeInsertType, ReturnMethodSafeInsertType> {
	constructor() {
		super({
			name: enumSecurityMethods.methodSafeInsert,
			paramSch: paramMethodSafeInsertSch,
			returnSch: returnMethodSafeInsertSch,
			roles: [EnumUserRoles.ADMIN]
		});
	}

	protected onError(_param: ParamMethodSafeInsertType & AuditType, _context: IContext, _error: Error): void {
		throw new Meteor.Error('500', _error.message);
	}

	async action(_param: ParamMethodSafeInsertType & AuditType, _context: IContext): Promise<ReturnMethodSafeInsertType> {
		const methodCollection = this.getServerInstance()?.getMethodCollection();
		if (!methodCollection) throw new Error('Method collection not found');

		const _id = `${_param.referred}.${textNormalize(_param.name)}`;
		const method = await methodCollection.findOneAsync({ _id });
		if (method) throw new Error('Method already exists');

		const result = await methodCollection.insertAsync({ _id, ..._param });
		return { _id: result };
	}
}

export const methodSafeInsert = new MethodSafeInsert();
