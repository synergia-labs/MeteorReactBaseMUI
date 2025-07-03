import { z } from "zod";
import { Meteor } from "meteor/meteor";
import enumEmailTemplate from "../enums/emailTemplate";

/**
 * Send Email Schema
 *
 * @property {string} from 		- Endeço de email do remetente
 * @property {string} to 		- Endereço de email do destinatário
 * @property {string} subject 	- Título do email
 * @property {string} template 	- Template do email
 * @property {any} templateProps - Propriedades do template
 */

export const sendEmailSchema = z.object({
	to: z
		.string()
		.email({ message: "Endereço de email do destinatário inválido" })
		.nonempty({ message: "O email deve possuir um destinatário" }),
	from: z
		.string()
		.email({ message: "Endereço de email do remetente inválido " })
		.default(Meteor.settings?.email?.system_sender)
		.optional(),
	subject: z.string().nonempty({ message: "O email deve possuir um título" }),
	tempalte: z.nativeEnum(enumEmailTemplate),
	templateProps: z.any().optional()
});

type SendEmailType = z.infer<typeof sendEmailSchema>;
export default SendEmailType;
