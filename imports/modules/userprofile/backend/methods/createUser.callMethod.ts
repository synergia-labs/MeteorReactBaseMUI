import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import EnumUserRoles from "../../common/enums/enumUserRoles";
import { ICreateUser } from "../../common/types/ICreateUser";
import { UserProfileServer } from "../server";
import { CreateMethodBase } from "/imports/base/server/methods/create.method.base";
import { IContext } from "/imports/typings/IContext";


/**
 * Método de criação de usuário
 * 
 * Regras:
 *   - Apenas usuários administradores podem criar usuários administradores.
 *   - Caso não exista nenhum usuário administrador, não há regras que restrinjam a criação de usuários administradores.
 * 
 * @param {ICreateUser} prop    - Dados do usuário a ser criado
 * @returns {string}            - ID do usuário criado
 */

class CreateUserCallMethod extends CreateMethodBase<UserProfileServer, ICreateUser, string> {
    constructor() {
        super({ name: enumUserProfileRegisterMethods.create });
    }

    protected insertAuditData(param: ICreateUser, _context: IContext): void {
        param.createdAt = new Date();
        param.createdBy = (_context.user._id ?? Meteor.userId() ?? 'System') as string;
    };

    protected async beforeAction(prop: ICreateUser, context: IContext): Promise<void> {
        console.log('beforeAction', prop, context);
        super.beforeAction(prop, context);

        if(prop.role !== EnumUserRoles.ADMIN) return;
        if(context.user?.role === EnumUserRoles.ADMIN) return;
        if(await this.getServerInstance()?.checkIfHasAdminUser())
            throw new Meteor.Error('500', 'Apenas usuários administradores podem criar usuários administradores');

    }

    async action(_prop: ICreateUser, _context: IContext): Promise<string> {
        const profile: Partial<ICreateUser> = {..._prop};
        delete profile.email;
        delete profile.password;
        
        return await Accounts.createUserAsync({
            email: _prop.email,
            password: _prop.password,
            profile: profile
        });
    }
} 

const createUserCallMethodInstance = new CreateUserCallMethod();
export default createUserCallMethodInstance;
