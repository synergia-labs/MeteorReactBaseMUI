import { UsersServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import SendUserEmailType, { sendUserEmailSchema } from "../../common/types/sendUserEmail";
import enumUsersRegisterMethods from "../../common/enums/enumRegisterMethods";

class SendVerificationEmail extends MethodBase<UsersServer, SendUserEmailType, void> {
	constructor() {
		super({
			name: enumUsersRegisterMethods.sendVerificationEmail,
			paramSch: sendUserEmailSchema
		});
	}

	async action({ _id, email }: SendUserEmailType, _context: IContext): Promise<void> {
		if (!_id && !email) this.generateError({ key: "notFound" }, _context);
		const mongoInstance = this.getServerInstance().getMongo();
		const user = email ? await Accounts.findUserByEmail(email) : await mongoInstance.findOneAsync({ _id });
		if (!user) this.generateError({ key: "notFound" }, _context);

		if (user!.emails?.[0]?.verified)
			this.generateError(
				{ key: "userEmailalreadyVerified", params: { email: user?.emails?.[0]?.address || "-" } },
				_context
			);

		await Accounts.sendVerificationEmail(user!._id);
	}
}

const sendVerificationEmail = new SendVerificationEmail();
export default sendVerificationEmail;
