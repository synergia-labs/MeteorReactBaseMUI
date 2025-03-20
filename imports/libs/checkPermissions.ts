import { getUser } from "../libs/getUser";
import { EnumUserRoles } from "../modules/userprofile/config/enumUser";

const checkPermissionAdmin = () => {
	const userLogged = getUser();
	return userLogged?.roles?.includes(EnumUserRoles.ADM);
};

const checkPermissionPublic = () => {
	const userLogged = getUser();
	return userLogged?.roles?.includes(EnumUserRoles.PUBLIC);
};

const checkPermissionUsuario = () => {
	const userLogged = getUser();
	return userLogged?.roles?.includes(EnumUserRoles.USER);
};

export { checkPermissionAdmin, checkPermissionPublic, checkPermissionUsuario };
