import { AuditType } from "../../../../../../types/audit";
import { SchemaType } from "../../../../../../types/schema";

interface IResetForgotPasswordSchema extends AuditType {
	password: string;
	confirmPassword: string;
}

const resetPasswordFrontSchema: SchemaType<IResetForgotPasswordSchema> = {
	password: {
		type: String,
		label: "senha",
		optional: false,
		validationFunction: (value, _doc) => {
			if (value.length < 6) return "A senha deve ter no mínimo 6 caracteres";
			return undefined;
		}
	},
	confirmPassword: {
		type: String,
		label: "confirmar senha",
		optional: false,
		validationFunction: (value, doc) => {
			if (value != doc?.password) return "As senhas não conferem";
			return undefined;
		}
	}
};

export default resetPasswordFrontSchema;
