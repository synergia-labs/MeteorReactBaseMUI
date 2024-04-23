export enum EnumUserPresences {
	ONLINE = 'Online',
	OFFLINE = 'Offline'
}

export enum EnumUserRoles {
	SUPERADMINISTRADOR = 'SuperAdministrador',
	ADMINISTRADOR = 'Administrador',
	USUARIO = 'Usuario',
	// GESTOR = 'gestor',
	// FUNCIONARIO = 'funcionario',
	PUBLICO = 'Publico'
}

export enum EnumUserTypes {
	ADMINISTRADOR = 'administrador',
	GESTOR = 'gestor',
	CONVIDADO = 'convidado',
	FUNCIONARIO = 'funcionario'
}

export const UserTypeDictionary: { [id: string]: string } = {
	[EnumUserTypes.GESTOR]: 'Professor(a)',
	[EnumUserTypes.ADMINISTRADOR]: 'Administrador',
	[EnumUserTypes.CONVIDADO]: 'Convidado(a)',
	[EnumUserTypes.FUNCIONARIO]: 'Funcionário(a)'
};
