import { SchemaType } from "/imports/base/types/schema";
import emailValidator from "/imports/libs/validators/email";

const signInFrontSchema: SchemaType<{}> = {
	email: {
		type: "String",
		label: "Email",
		optional: false,
		validationFunction: (value: string) => {
			const email = emailValidator(value);
			if (!email) return "Email inválido";
			return undefined;
		},
		defaultValue: "adm@adm.com"
	},
	password: {
		type: "String",
		label: "Senha",
		optional: false,
		validationFunction: (value: string) => {
			if (value.length < 6) return "A senha deve ter no mínimo 6 caracteres";
			return undefined;
		},
		defaultValue: "123456"
	}
};

export default signInFrontSchema;
