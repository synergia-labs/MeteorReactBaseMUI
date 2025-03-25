import { z } from "zod";
import { enumEmailMethods } from "../common/enums/methods.enum";
import SendEmailType, { sendEmailSchema } from "../common/types/sendEmail";
import { EmailServer } from "../email.server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/typings/IContext";
import { Email } from "meteor/email";

class SendEmailCallMethod extends MethodBase<EmailServer, SendEmailType, void> {
	constructor() {
		super({
			name: enumEmailMethods.sendEmail,
			paramSch: sendEmailSchema,
			returnSch: z.void()
		});
	}

	async action(
		{ to, from = Meteor.settings.email.system_sender, subject, html }: SendEmailType,
		_context: IContext
	): Promise<void> {
		Email.sendAsync({
			to: to,
			from: from,
			subject: subject,
			html: html
		}).catch((error) => {
			console.error(error);
		});
	}
}

const sendEmailInstance = new SendEmailCallMethod();
export default sendEmailInstance;
