import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import EnumUserRoles from "../../common/enums/enumUserRoles";
import { UserProfileServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/typings/IContext";


/**
 * Método de verificação de existência de usuário administrador
 * 
 * @returns {boolean} - Retorna true se existir um usuário administrador cadastrado no sistema, false caso contrário.
 */

class CheckIfHasAdminUserCallMethod extends MethodBase<UserProfileServer, void, boolean> {
    constructor() {
        super({ name: enumUserProfileRegisterMethods.checkIfHasAdminUser });
    }

    async action(_prop: void, _context: IContext): Promise<boolean> {
        const adminUser = await this.getServerInstance()?.mongoInstance.findOneAsync({ "profile.roles": EnumUserRoles.ADMIN });
        return !!adminUser;
    }
} 

const checkIfHasAdminUserCallMethodInstance = new CheckIfHasAdminUserCallMethod();
export default checkIfHasAdminUserCallMethodInstance;
