import { z } from "zod";
import { Meteor } from "meteor/meteor";

/**
 * Send Email Schema
 *
 * @property {string} from 		- Endeço de email do remetente
 * @property {string} to 		- Endereço de email do destinatário
 * @property {string} subject 	- Título do email
 * @property {string} html 		- Corpo do email. obs: Deve
 * 									ser um html em formato de string, utilizar a função `renderHtmlServerSide` para
 * 									converter um componente React em uma string de html
 */

export const sendEmailSchema = z.object({
	to: z
		.string()
		.email({ message: "Endereço de email do destinatário inválido" })
		.nonempty({ message: "O email deve possuir um destinatário" }),
	from: z
		.string()
		.email({ message: "Endereço de email do remetente inválido " })
		.default(Meteor.settings.email.system_sender)
		.optional(),
	subject: z.string().nonempty({ message: "O email deve possuir um título" }),
	html: z.string().nonempty({ message: "O email deve possuir um corpo" })
});

type SendEmailType = z.infer<typeof sendEmailSchema>;
export default SendEmailType;
