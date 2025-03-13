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

	async action(_param: ParamRoleSafeInsertType & AuditType, _context: IContext): Promise<ReturnRoleSafeInsertType> {
		const roleCollection = this.getServerInstance()?.getRoleCollection().getCollectionInstance();
		const _id = `${_param.referred}.${textNormalize(_param.name)}`;

		const role = await roleCollection?.findOne({ _id });
		return { _id: '123' };
	}
}
