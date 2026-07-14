import { getUser } from '../libs/getUser';
import { EnumUserRoles } from '../modules/userprofile/api/enumUser';

interface InstituicaoRef {
	_id?: string;
}

const checkPermissionSuperAdmin = (_id?: string) => {
	const userLogged = getUser();
	return userLogged.roles && userLogged.roles.indexOf(EnumUserRoles.SUPERADMINISTRADOR) !== -1;
};

const checkPermissionAdmin = (instituicao?: InstituicaoRef) => {
	const userLogged = getUser();
	if (checkPermissionSuperAdmin()) {
		return true;
	}
	return (
		userLogged &&
		userLogged.roles &&
		userLogged.roles.indexOf(EnumUserRoles.ADMINISTRADOR) !== -1 &&
		instituicao &&
		(userLogged as typeof userLogged & { instituicaoId?: string }).instituicaoId === instituicao._id
	);
};

const checkPermissionPublic = () => {
	const userLogged = getUser();
	return userLogged.roles && userLogged.roles.indexOf(EnumUserRoles.PUBLICO) !== -1;
};

const checkPermissionUsuario = () => {
	const userLogged = getUser();
	if (checkPermissionSuperAdmin()) {
		return true;
	}
	return userLogged.roles && userLogged.roles.indexOf(EnumUserRoles.USUARIO) !== -1;
};

export { checkPermissionAdmin, checkPermissionSuperAdmin, checkPermissionPublic, checkPermissionUsuario };
