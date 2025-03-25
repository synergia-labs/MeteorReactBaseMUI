import { z } from "zod";
import { enumEmailMethods } from "../common/enums/methods.enum";
import SendEmailType, { sendEmailSchema } from "../common/types/sendEmail";
import { EmailServer } from "../email.server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "/imports/typings/IContext";
import { Email } from "meteor/email";
import renderHtmlServerSide from "../utils/renderHtmlServerSide";
import enumEmailTemplate from "../common/enums/emailTemplate";
import SimpleEmailTemplate from "../templates/simpleEmailTemplate/simpleEmailTemplate.view";

/**
 * Método para o envio de e-mails pelo cliente
 * * Todo email do lado do cliente é renderizado em cima de um template previamente definido em /templates.
 * * O método recebe um objeto com as informações necessárias para o envio do e-mail.
 */

// Adicione novos templates aqui
const templatesList = {
	[enumEmailTemplate.SIMPLE_EMAIL]: SimpleEmailTemplate
} as const;
class SendEmailCallMethod extends MethodBase<EmailServer, SendEmailType, void> {
	constructor() {
		super({
			name: enumEmailMethods.sendEmail,
			paramSch: sendEmailSchema,
			returnSch: z.void()
		});
	}

	async action(
		{ to, from = Meteor.settings.email.system_sender, subject, templateProps, tempalte }: SendEmailType,
		_context: IContext
	): Promise<void> {
		Email.sendAsync({
			to: to,
			from: from,
			subject: subject,
			html: renderHtmlServerSide(templatesList[tempalte](templateProps))
		}).catch((error) => {
			console.error(error);
		});
	}
}

const sendEmailInstance = new SendEmailCallMethod();
export default sendEmailInstance;
