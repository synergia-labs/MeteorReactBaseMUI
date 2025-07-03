import { UsersServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import enumUserRoles from "../../common/enums/enumUserRoles";
import enumUsersRegisterMethods from "../../common/enums/enumRegisterMethods";

/**
 * Método de verificação de existência de usuário administrador
 *
 * @returns {boolean} - Retorna true se existir um usuário administrador cadastrado no sistema, false caso contrário.
 */

class CheckIfHasAdminUserCallMethod extends MethodBase<UsersServer, void, boolean> {
	constructor() {
		super({ name: enumUsersRegisterMethods.checkIfHasAdminUser });
	}

	async action(_prop: void, _context: IContext): Promise<boolean> {
		const adminUser = await this.getServerInstance(_context).getMongo().findOneAsync({
			"profile.roles": enumUserRoles.ADMIN
		});
		return !!adminUser;
	}
}

const checkIfHasAdminUserCallMethodInstance = new CheckIfHasAdminUserCallMethod();
export default checkIfHasAdminUserCallMethodInstance;
