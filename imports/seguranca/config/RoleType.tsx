import {LabelValue} from "/imports/typings/ISchema";

export enum RoleType {
	ADMINISTRADOR = "Administrador",
	PUBLICO = "Publico",
}

type IRolesDicionario = {
  [key: string]: string
}

export const rolesDicionario: IRolesDicionario = {
	[RoleType.ADMINISTRADOR]: "Administrador",
	[RoleType.PUBLICO]: "Público",
}

export function obterListaRoles(): LabelValue[] {
	// @ts-ignore
	return Object.keys(rolesDicionario).filter(
		chave => !!rolesDicionario[chave]
	).map(chave => ({
		value: chave,
		label: rolesDicionario[chave],
	}));
}

