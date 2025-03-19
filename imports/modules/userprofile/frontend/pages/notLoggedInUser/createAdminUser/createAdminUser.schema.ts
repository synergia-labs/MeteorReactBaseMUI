import { SchemaType } from "/imports/base/types/schema";
import emailValidator from "/imports/libs/validators/email";
import { CreateUserType } from "/imports/modules/userprofile/common/types/createUser";

const createUserFrontSchema: SchemaType<CreateUserType> = {
    name: {
        type: String,
        label: "Nome",
        optional: false,
    },
    email: {
        type: String,
        label: "E-mail",
        optional: false,
        validationFunction: (value: string) => {
            if(!emailValidator(value)) return "E-mail inválido";
            return undefined;
        }
    },
    password: {
        type: String,
        label: "Senha",
        optional: false,
        validationFunction: (value: string) => {
            if(value.length < 6) return "A senha deve ter no mínimo 6 caracteres";
            return undefined;
        }
    }
} as const;

export default createUserFrontSchema;