import { LabelValue } from '/imports/typings/ISchema';

export enum RoleType {
	ADMINISTRADOR = 'Administrador',
	USUARIO = 'Usuario',
	PUBLICO = 'Publico'
}

type IRolesDicionario = Record<RoleType, string>;

export const rolesDicionario: IRolesDicionario = {
	[RoleType.ADMINISTRADOR]: 'Administrador',
	[RoleType.USUARIO]: 'Usuário',
	[RoleType.PUBLICO]: 'Público'
};

export function obterListaRoles(): Array<LabelValue> {
	return (Object.keys(rolesDicionario) as RoleType[])
		.filter((chave) => !!rolesDicionario[chave])
		.map((chave) => ({
			value: chave,
			label: rolesDicionario[chave]
		}));
}
