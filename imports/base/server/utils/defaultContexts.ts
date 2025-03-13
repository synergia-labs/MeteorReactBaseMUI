import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';

export function getDefaultPublicContext(context: Partial<IContext>): IContext {
	const newContext: IContext = {
		apiName: '',
		action: '',
		session: {},
		connection: {
			id: '123',
			close: () => {},
			onClose: () => {},
			clientAddress: '',
			httpHeaders: {
				'x-forwarded-for': '',
				'x-forwarded-port': '',
				'x-forwarded-proto': '',
				host: '',
				'user-agent': '',
				'accept-language': ''
			}
		},
		user: {
			_id: EnumUserRoles.PUBLIC,
			roles: [EnumUserRoles.PUBLIC],
			username: EnumUserRoles.PUBLIC,
			email: EnumUserRoles.PUBLIC
		},
		...context
	};

	return newContext;
}

export function getDefaultAdminContext(context?: Partial<IContext>): IContext {
	const newContext: IContext = {
		apiName: '',
		action: '',
		session: {},
		connection: {
			id: '123',
			close: () => {},
			onClose: () => {},
			clientAddress: '',
			httpHeaders: {
				'x-forwarded-for': '',
				'x-forwarded-port': '',
				'x-forwarded-proto': '',
				host: '',
				'user-agent': '',
				'accept-language': ''
			}
		},
		user: {
			_id: EnumUserRoles.ADM,
			roles: [EnumUserRoles.ADM],
			username: EnumUserRoles.ADM,
			email: EnumUserRoles.ADM
		},
		...context
	};

	return newContext;
}
