import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { UsersServer } from "../server";
import enumUsersRegisterMethods from "../../common/enums/enumRegisterMethods";
import SendUserEmailType, { sendUserEmailSchema } from "../../common/types/sendUserEmail";
import updateUser from "../methods/updateUser";
import { MeteorUserType } from "../../common/types/meteorUser";

class SendResetPasswordEmail extends MethodBase<UsersServer, SendUserEmailType, void> {
	constructor() {
		super({
			name: enumUsersRegisterMethods.sendResetPasswordEmail,
			paramSch: sendUserEmailSchema
		});
	}

	async action({ _id, email }: SendUserEmailType, _context: IContext): Promise<void> {
		if (!_id && !email) this.generateError({ key: "notFound" }, _context);
		const mongoInstance = this.getServerInstance().getMongo();
		const user = (
			email ? await Accounts.findUserByEmail(email) : await mongoInstance.findOneAsync({ _id })
		) as MeteorUserType;
		if (!user || !user.profile) this.generateError({ key: "notFound" }, _context);

		await updateUser.execute(user, _context);

		if (!user) this.generateError({ key: "notFound" }, _context);
		Accounts.sendResetPasswordEmail(user!._id);
	}
}

const sendResetPasswordInstance = new SendResetPasswordEmail();
export default sendResetPasswordInstance;
