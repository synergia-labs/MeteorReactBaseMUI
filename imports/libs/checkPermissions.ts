import { getUser } from '../libs/getUser';
import { EnumUserRoles } from '../modules/userprofile/api/EnumUser';

const checkPermissionSuperAdmin = (id) => {
	const userLogged = getUser();
	return userLogged.roles && userLogged.roles.indexOf(EnumUserRoles.SUPERADMINISTRADOR) !== -1;
};

const checkPermissionAdmin = (instituicao) => {
	const userLogged = getUser();
	if (checkPermissionSuperAdmin()) {
		return true;
	}
	return (
		userLogged &&
		userLogged.roles &&
		userLogged.roles.indexOf(EnumUserRoles.ADMINISTRADOR) !== -1 &&
		instituicao &&
		userLogged.instituicaoId === instituicao._id
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
