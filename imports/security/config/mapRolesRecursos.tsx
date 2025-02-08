import { Recurso as Exemplo } from '/imports/modules/example/config/recursos';
import { Recurso as Aniversario } from '/imports/modules/aniversario/config/recursos';
import { Recurso as Usuarios } from '/imports/modules/userprofile/config/recurso';
import { RoleType } from '/imports/security/config/roleType';
import { HomeResources, SysFormTestPageResources } from '/imports/sysPages/config/resources';

const _getAllValues = (obj: any) => Object.keys(obj).map(key => obj[key]);

type MapRolesRecursos = Record<RoleType, Array<string>>; 

const _mapRolesRecursos: MapRolesRecursos = {
	[RoleType.PUBLICO]: [],
	[RoleType.USUARIO]: [
		..._getAllValues(Exemplo),
		..._getAllValues(HomeResources),
		..._getAllValues(SysFormTestPageResources),
		..._getAllValues(Aniversario),
		Usuarios.USUARIO_UPDATE,
		Usuarios.USUARIO_VIEW,	
	],
	[RoleType.ADMINISTRADOR]: [
		Usuarios.USUARIO_CREATE,
		Usuarios.USUARIO_REMOVE,
	],
};

/**
 * Mapeamento entre as roles (perfil de usuário) e os recursos.
 * chave: role.
 * valores: recursos.
 *
 *
 * O nome do recurso deve ser prefixado com nome do módulo.
 */
export const mapRolesRecursos: MapRolesRecursos = {
	[RoleType.PUBLICO]: [
		..._mapRolesRecursos[RoleType.PUBLICO],
	],
	[RoleType.USUARIO]: [
		..._mapRolesRecursos[RoleType.PUBLICO],
		..._mapRolesRecursos[RoleType.USUARIO],
	],
	[RoleType.ADMINISTRADOR]: [
		..._mapRolesRecursos[RoleType.PUBLICO],
		..._mapRolesRecursos[RoleType.USUARIO],
		..._mapRolesRecursos[RoleType.ADMINISTRADOR],
	],
};