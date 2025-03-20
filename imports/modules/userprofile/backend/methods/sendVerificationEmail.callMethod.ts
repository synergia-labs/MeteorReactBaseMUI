import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import { UsersServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/typings/IContext";

class SendVerificationEmail extends MethodBase<UsersServer, void, void> {
	constructor() {
		super({ name: enumUserProfileRegisterMethods.sendVerificationEmail });
	}

	async action(_prop: void, _context: IContext): Promise<void> {}
}

const sendVerificationEmailInstance = new SendVerificationEmail();
export default sendVerificationEmailInstance;
