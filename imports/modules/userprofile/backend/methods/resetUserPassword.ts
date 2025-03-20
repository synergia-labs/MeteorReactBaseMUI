import { z } from "zod";
import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import { resetUserPasswordSchema, ResetUserPasswordType } from "../../common/types/resetUserPassword";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/typings/IContext";
import EnumUserRoles from "../../common/enums/enumUserRoles";
import { Accounts } from "meteor/accounts-base";
import { hasValue } from "/imports/libs/hasValue";
import { UsersServer } from "../server";

class ResetUserPassword extends MethodBase<UsersServer, ResetUserPasswordType, void> {
	constructor() {
		super({
			name: enumUserProfileRegisterMethods.resetUserPassword,
			paramSch: resetUserPasswordSchema,
			returnSch: z.void(),
			roles: [EnumUserRoles.PUBLIC]
		});
	}

	async action({ token, newPassword }: ResetUserPasswordType, _context: IContext): Promise<void> {
		const user = Accounts._checkResetPasswordToken(token);
		if (!hasValue(user)) this.generateError({ _message: "Token inválido", _code: "400" }, _context);

		await Accounts.setPasswordAsync(user!._id, newPassword);

		Accounts._clearResetPasswordToken(user!._id);
	}
}

const resetUserPasswordInstance = new ResetUserPassword();
export default resetUserPasswordInstance;
