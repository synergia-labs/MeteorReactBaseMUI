import { getUser } from "../libs/getUser";
import { enumUserRoles } from "../modules/userprofile/config/enumUser";

const checkPermissionAdmin = () => {
	const userLogged = getUser();
	return userLogged?.roles?.includes(enumUserRoles.ADM);
};

const checkPermissionPublic = () => {
	const userLogged = getUser();
	return userLogged?.roles?.includes(enumUserRoles.PUBLIC);
};

const checkPermissionUsuario = () => {
	const userLogged = getUser();
	return userLogged?.roles?.includes(enumUserRoles.USER);
};

export { checkPermissionAdmin, checkPermissionPublic, checkPermissionUsuario };
