import { SchemaType } from "/imports/base/types/schema";
import emailValidator from "/imports/libs/validators/email";

const userDetailFrontSchema: SchemaType<any> = {
	name: {
		type: String,
		label: "Nome",
		optional: false,
		validationFunction: (value: string) => {
			if (value.length < 3) return "Nome deve ter no mínimo 3 caracteres.";
			return undefined;
		}
	},
	email: {
		type: String,
		label: "E-mail",
		optional: false,
		validationFunction: (value: string) => {
			if (emailValidator(value)) return "E-mail inválido.";
			return undefined;
		}
	},
	password: {
		type: String,
		label: "Senha",
		optional: true,
		validationFunction: (value: string) => {
			if (value.length < 6) return "Senha deve ter no mínimo 6 caracteres.";
			return undefined;
		}
	},
	roles: {
		type: [String],
		label: "Perfil",
		optional: false
	}
};

export default userDetailFrontSchema;
