import { z } from "zod";
import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import EnumUserRoles from "../../common/enums/enumUserRoles";
import { createUserSchema, CreateUserType } from "../../common/types/createUser";
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
 * @param {CreateUserType} prop    - Dados do usuário a ser criado
 * @returns {string}            - ID do usuário criado
 */

class CreateUserCallMethod extends CreateMethodBase<UserProfileServer, CreateUserType, string> {
    constructor() {
        super({ 
            name: enumUserProfileRegisterMethods.create,
            paramSch: createUserSchema,
            returnSch: z.string().nonempty(),
        });
    }

    protected insertAuditData(param: CreateUserType, _context: IContext): void {
        param.createdAt = new Date();
        param.createdBy = (Meteor.userId() ?? 'System') as string;
    };

    protected async beforeAction(prop: CreateUserType, context: IContext): Promise<void> {
        super.beforeAction(prop, context);

        if(prop.roles.includes(EnumUserRoles.ADMIN)) return;
        if(context.user?.profile?.roles?.includes(EnumUserRoles.ADMIN)) return;
        if(await this.getServerInstance()?.checkIfHasAdminUser())
            throw new Meteor.Error('500', 'Apenas usuários administradores podem criar usuários administradores');

    }

    async action(_prop: CreateUserType, _context: IContext): Promise<string> {
        const profile: Partial<CreateUserType> = {..._prop};
        delete profile.email;
        delete profile.password;
        
        return await Accounts.createUserAsync({
            email: _prop.email,
            password: _prop.password,
            profile: profile
        });
    };

    protected async afterAction(_prop: CreateUserType, _result: string, _context: IContext): Promise<void> {
        super.afterAction(_prop, _result, _context);
        Accounts.sendVerificationEmail(_result);
    };

    protected async onError(_param: CreateUserType, _context: IContext, _error: Meteor.Error): Promise<string | void> {
        await this.getServerInstance()?.mongoInstance.removeAsync({ 'emails.address': _param.email });
        console.error(`[ERROR] Erro ao criar o usuário ${_param.email}: ${_error}`);
        throw new Meteor.Error('500', `[${this.getName()}]: Erro interno - ${_error}`);
    }
} 

const createUserCallMethodInstance = new CreateUserCallMethod();
export default createUserCallMethodInstance;
