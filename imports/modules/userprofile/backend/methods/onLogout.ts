import { z } from "zod";
import { UserProfileServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/typings/IContext";
import { OnLoginType } from "../../common/types/onLogin";
import { onLogoutSchema, OnLogoutType } from "../../common/types/onLogout";


/**
 * Método chamado quando um usuário faz logout.
 * 
 * Este método é chamado automaticamente e configurado no Accounts do sistema.
 * 
 * @param { Meteor.User } user - Usuário que fez logout.
 */

class OnLogout extends MethodBase<UserProfileServer, OnLogoutType, void> {
    constructor() {
        super({
            name: 'server.onLogout',
            paramSch: onLogoutSchema,
            returnSch: z.void(),
        });
    }

    async beforeAction(_: OnLogoutType, _context: IContext): Promise<void> {
        return;
    }

    async action({ user }: OnLoginType, _context: IContext): Promise<void> {
        if (!user?._id) return;
        await this.getServerInstance()?.mongoInstance.updateAsync(
            { _id: user?._id },
            { $set: { 'profile.connected': false, 'profile.lastAccess': new Date() } }
        );
    }
}

const onLogoutInstance = new OnLogout();
export default onLogoutInstance;
