import { enumResources as Exemplo } from "/imports/modules/example/config/recursos";
import { enumHomeResources, enumSysFormTestPageResources } from "/imports/sysPages/config/resources";
import enumUserRoles from "../../modules/userprofile/common/enums/enumUserRoles";

const _getAllValues = (obj: any) => Object.keys(obj).map((key) => obj[key]);

type MapRolesRecursosType = Record<enumUserRoles, Array<string>>;

const _mapRolesRecursos: MapRolesRecursosType = {
	[enumUserRoles.PUBLIC]: [],
	[enumUserRoles.USER]: [
		..._getAllValues(Exemplo),
		..._getAllValues(enumHomeResources),
		..._getAllValues(enumSysFormTestPageResources)
	],
	[enumUserRoles.ADMIN]: []
};

/**
 * Mapeamento entre as roles (perfil de usuário) e os recursos.
 * chave: role.
 * valores: recursos.
 *
 *
 * O nome do recurso deve ser prefixado com nome do módulo.
 */
export const mapRolesRecursos: MapRolesRecursosType = {
	[enumUserRoles.PUBLIC]: [..._mapRolesRecursos[enumUserRoles.PUBLIC]],
	[enumUserRoles.USER]: [..._mapRolesRecursos[enumUserRoles.PUBLIC], ..._mapRolesRecursos[enumUserRoles.USER]],
	[enumUserRoles.ADMIN]: [
		..._mapRolesRecursos[enumUserRoles.PUBLIC],
		..._mapRolesRecursos[enumUserRoles.USER],
		..._mapRolesRecursos[enumUserRoles.ADMIN]
	]
};
