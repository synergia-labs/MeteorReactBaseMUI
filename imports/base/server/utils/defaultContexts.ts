import EnumUserRoles from '../../../modules/userprofile/common/enums/enumUserRoles';
import { IContext } from '/imports/typings/IContext';

export function getDefaultPublicContext(context: Partial<IContext>): IContext {
	const newContext: IContext = {
		apiName: '',
		action: '',
		user: {
			_id: EnumUserRoles.ADMIN,
			username: EnumUserRoles.ADMIN,
			emails: [{ address: EnumUserRoles.ADMIN, verified: true }],
			profile: {
				roles: [EnumUserRoles.ADMIN],
				name: EnumUserRoles.ADMIN
			}
		},
		...context
	};

	return newContext;
}

export function getDefaultAdminContext(context?: Partial<IContext>): IContext {
	const newContext: IContext = {
		apiName: '',
		action: '',
		user: {
			_id: EnumUserRoles.ADMIN,
			username: EnumUserRoles.ADMIN,
			emails: [{ address: EnumUserRoles.ADMIN, verified: true }],
			profile: {
				roles: [EnumUserRoles.ADMIN],
				name: EnumUserRoles.ADMIN
			}
		},
		...context
	};

	return newContext;
}
