import { enumSecurityMethods } from '../common/enums/methods.enum';
import {
	paramRoleSafeInsertSch,
	ParamRoleSafeInsertType,
	returnRoleSafeInsertSch,
	ReturnRoleSafeInsertType
} from '../common/types/roleSafeInsert';
import { SecurityServer } from '../security.server';
import { CreateMethodBase } from '/imports/base/server/methods/create.method.base';
import { AuditType } from '/imports/base/types/audit';
import { textNormalize } from '/imports/libs/textUtilities';
import { IContext } from '/imports/typings/IContext';

class RoleSafeInsert extends CreateMethodBase<SecurityServer, ParamRoleSafeInsertType, ReturnRoleSafeInsertType> {
	constructor() {
		super({
			name: enumSecurityMethods.roleSafeInsert,
			paramSch: paramRoleSafeInsertSch,
			returnSch: returnRoleSafeInsertSch,
			roles: []
		});
	}

	protected onError(_param: ParamRoleSafeInsertType & AuditType, _context: IContext, _error: Error): void {
		throw new Meteor.Error('500', _error.message);
	}

	async action(_param: ParamRoleSafeInsertType & AuditType, _context: IContext): Promise<ReturnRoleSafeInsertType> {
		const roleCollection = this.getServerInstance()?.getRoleCollection();
		if (!roleCollection) throw new Error('Role collection not found');

		const _id = `${_param.referred}.${textNormalize(_param.name)}`;
		const role = await roleCollection.findOneAsync({ _id });

		if (role) throw new Error('Role already exists');

		const result = await roleCollection.insertAsync({ _id, ..._param });
		return { _id: result };
	}
}

export const roleSafeInsert = new RoleSafeInsert();
