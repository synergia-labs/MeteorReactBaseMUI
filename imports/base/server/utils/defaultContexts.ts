import enumUserRoles from "../../../modules/userprofile/common/enums/enumUserRoles";
import { IContext } from "../../../types/context";

export function getDefaultPublicContext(context: Partial<IContext>): IContext {
	const newContext: IContext = {
		apiName: "",
		action: "",
		user: {
			_id: enumUserRoles.ADMIN,
			username: enumUserRoles.ADMIN,
			emails: [{ address: enumUserRoles.ADMIN, verified: true }],
			profile: {
				roles: [enumUserRoles.ADMIN],
				name: enumUserRoles.ADMIN
			}
		},
		...context
	};

	return newContext;
}

export function getDefaultAdminContext(context?: Partial<IContext>): IContext {
	const newContext: IContext = {
		apiName: "",
		action: "",
		user: {
			_id: enumUserRoles.ADMIN,
			username: enumUserRoles.ADMIN,
			emails: [{ address: enumUserRoles.ADMIN, verified: true }],
			profile: {
				roles: [enumUserRoles.ADMIN],
				name: enumUserRoles.ADMIN
			}
		},
		...context
	};

	return newContext;
}
