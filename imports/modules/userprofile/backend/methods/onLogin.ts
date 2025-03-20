import { z } from "zod";
import { UserProfileServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/typings/IContext";
import { onLoginSchema, OnLoginType } from "../../common/types/onLogin";

/**
 * Método chamado quando um usuário faz login.
 *
 * Este método é chamado automaticamente e configurado no Accounts do sistema.
 *
 * @param { Meteor.User } user              - Usuário que fez login.
 * @param { Meteor.IConnection } connection - Conexão do usuário.
 */

class OnLogin extends MethodBase<UserProfileServer, OnLoginType, void> {
	constructor() {
		super({
			name: "users.onLogin",
			paramSch: onLoginSchema,
			returnSch: z.void(),
			canRegister: false
		});
	}

	async action({ user, connection }: OnLoginType, _context: IContext): Promise<void> {
		if (!user?._id) return;
		await this.getServerInstance()?.mongoInstance.updateAsync(
			{ _id: user._id },
			{ $set: { "profile.connected": true, "profile.lastAccess": new Date() } }
		);

		const onLogoutHandler = this.getServerInstance()?.onLogout.bind(this.getServerInstance(), { user });
		if (onLogoutHandler) {
			connection.onClose(Meteor.bindEnvironment(onLogoutHandler));
		}
	}
}

const onLoginInstance = new OnLogin();
export default onLoginInstance;
