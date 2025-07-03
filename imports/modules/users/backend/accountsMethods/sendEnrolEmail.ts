import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { UsersServer } from "../server";
import enumUsersRegisterMethods from "../../common/enums/enumRegisterMethods";
import SendUserEmailType, { sendUserEmailSchema } from "../../common/types/sendUserEmail";

class SendEnrolEmail extends MethodBase<UsersServer, SendUserEmailType, void> {
	constructor() {
		super({
			name: enumUsersRegisterMethods.sendEnrolEmail,
			paramSch: sendUserEmailSchema
		});
	}

	async action({ _id, email }: SendUserEmailType, _context: IContext): Promise<void> {
		if (!_id && !email) this.generateError({ key: "notFound" }, _context);
		const mongoInstance = this.getServerInstance().getMongo();
		const user = email ? await Accounts.findUserByEmail(email) : await mongoInstance.findOneAsync({ _id });
		if (!user) this.generateError({ key: "notFound" }, _context);
		Accounts.sendEnrollmentEmail(user!._id);
	}
}

const sendEnrolEmail = new SendEnrolEmail();
export default sendEnrolEmail;
