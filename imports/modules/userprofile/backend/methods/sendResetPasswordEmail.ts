import { z } from "zod";
import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import { UserProfileServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/typings/IContext";
import EnumUserRoles from "../../common/enums/enumUserRoles";
import { hasValue } from "/imports/libs/hasValue";

class SendResetPasswordEmail extends MethodBase<UserProfileServer, string, void> {
	constructor() {
		super({
			name: enumUserProfileRegisterMethods.sendResetPasswordEmail,
			paramSch: z.string().email(),
			returnSch: z.void(),
			roles: [EnumUserRoles.PUBLIC]
		});
	}

	async action(_prop: string, _context: IContext): Promise<void> {
		const user = await Accounts.findUserByEmail(_prop);
		if (!hasValue(user)) this.generateError({ _message: "Usuário não encontrado" });
		Accounts.sendResetPasswordEmail(user!._id);
	}
}

const sendResetPasswordInstance = new SendResetPasswordEmail();
export default sendResetPasswordInstance;
