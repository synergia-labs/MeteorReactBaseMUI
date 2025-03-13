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

	action(_param: ParamRoleSafeInsertType & AuditType, _context: IContext): ReturnRoleSafeInsertType {
		const server = this.getServerInstance()?.getRoleCollection().getCollectionInstance();

		return { _id: '123' };
	}
}
