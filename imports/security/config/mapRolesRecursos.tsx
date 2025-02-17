import { Recurso as Exemplo } from '/imports/modules/example/config/recursos';
import { Recurso as Aniversario } from '/imports/modules/aniversario/config/recursos';
import { Recurso as Usuarios } from '/imports/modules/userprofile/config/recurso';
import { HomeResources, SysFormTestPageResources } from '/imports/sysPages/config/resources';
import { EnumUserRoles } from '../../modules/userprofile/config/enumUser';

const _getAllValues = (obj: any) => Object.keys(obj).map(key => obj[key]);

type MapRolesRecursos = Record<EnumUserRoles, Array<string>>; 

const _mapRolesRecursos: MapRolesRecursos = {
	[EnumUserRoles.PUBLIC]: [],
	[EnumUserRoles.USER]: [
		..._getAllValues(Exemplo),
		..._getAllValues(HomeResources),
		..._getAllValues(SysFormTestPageResources),
		..._getAllValues(Aniversario),
		Usuarios.USUARIO_UPDATE,
		Usuarios.USUARIO_VIEW,	
	],
	[EnumUserRoles.ADM]: [
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
	[EnumUserRoles.PUBLIC]: [
		..._mapRolesRecursos[EnumUserRoles.PUBLIC],
	],
	[EnumUserRoles.USER]: [
		..._mapRolesRecursos[EnumUserRoles.PUBLIC],
		..._mapRolesRecursos[EnumUserRoles.USER],
	],
	[EnumUserRoles.ADM]: [
		..._mapRolesRecursos[EnumUserRoles.PUBLIC],
		..._mapRolesRecursos[EnumUserRoles.USER],
		..._mapRolesRecursos[EnumUserRoles.ADM],
	],
};