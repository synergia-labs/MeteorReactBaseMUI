import { hasValue } from '/imports/libs/hasValue';

export enum EnumUserPresences {
	ONLINE = 'Online',
	OFFLINE = 'Offline'
}
export enum EnumUserRoles {
	ADM = 'adm',
	USER = 'user',
	PUBLIC = 'public'
}

const UserRolesDictionary: Record<EnumUserRoles, string> = {
	[EnumUserRoles.ADM]: 'Administrador',
	[EnumUserRoles.USER]: 'Usuário',
	[EnumUserRoles.PUBLIC]: 'Público'
} as const;

export const getUserRoleTranslated = (role: EnumUserRoles | string): string => {
	const roleTranslated = UserRolesDictionary[role as EnumUserRoles];
	if (!hasValue(roleTranslated)) return '';
	return roleTranslated;
};
