import { Recurso as Exemplo } from '/imports/modules/example/config/recursos';
import { Recurso as Usuarios } from '/imports/modules/userprofile/config/recurso';
import { RoleType } from '/imports/security/config/roleType';
import { HomeResources, SysFormTestPageResources } from '/imports/sysPages/config/resources';

type MapRolesRecursos = {
	[key: string]: string[];
};

const publicRoles: string[] = [];

const usuarioRoles: string[] = [
	...publicRoles,
	Exemplo.EXAMPLE_VIEW,
	Exemplo.EXAMPLE_CREATE,
	Exemplo.EXAMPLE_UPDATE,
	Exemplo.EXAMPLE_REMOVE,
	HomeResources.HOME_VIEW,
	HomeResources.HOME_CREATE,
	HomeResources.HOME_UPDATE,
	HomeResources.HOME_REMOVE,
	SysFormTestPageResources.SYSFORMTESTS_VIEW,
	SysFormTestPageResources.SYSFORMTESTS_CREATE,
	SysFormTestPageResources.SYSFORMTESTS_UPDATE,
	SysFormTestPageResources.SYSFORMTESTS_REMOVE,
	Usuarios.USUARIO_UPDATE,
	Usuarios.USUARIO_VIEW
];

const adminstradorRoles: string[] = [...usuarioRoles, Usuarios.USUARIO_CREATE, Usuarios.USUARIO_REMOVE];

/**
 * Mapeamento entre as roles (perfil de usuário) e os recursos.
 * chave: role.
 * valores: recursos.
 *
 *
 * O nome do recurso deve ser prefixado com nome do módulo.
 *
 * Favor manter a ordem alfabética no nome dos módulos.
 *
 */
export const mapRolesRecursos: MapRolesRecursos = {
	[RoleType.ADMINISTRADOR]: adminstradorRoles,
	[RoleType.USUARIO]: usuarioRoles,
	[RoleType.PUBLICO]: publicRoles
};
