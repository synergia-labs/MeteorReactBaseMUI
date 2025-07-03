import { z } from "zod";
import { resetUserPasswordSchema, ResetUserPasswordType } from "../../common/types/resetUserPassword";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { UsersServer } from "../server";
import enumUserRoles from "../../common/enums/enumUserRoles";

class ResetUserPassword extends MethodBase<UsersServer, ResetUserPasswordType, void> {
	constructor() {
		super({
			name: "accounts.resetUserPassword",
			paramSch: resetUserPasswordSchema,
			returnSch: z.void(),
			roles: [enumUserRoles.PUBLIC]
		});
	}

	async action(_: ResetUserPasswordType, _context: IContext): Promise<void> {}
}

const resetUserPasswordInstance = new ResetUserPassword();
export default resetUserPasswordInstance;
