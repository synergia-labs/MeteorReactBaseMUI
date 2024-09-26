import { validarEmail } from '../../../libs/validaEmail';
import { IDoc } from '../../../typings/IDoc';
import { ISchema } from '../../../typings/ISchema';

export const signInSchema: ISchema<ISignIn> = {
	email: {
		type: 'String',
		label: 'Email',
		optional: false,
		defaultValue: 'admin@mrb.com',
		validationFunction: (value: string) => {
			if (!value) return undefined;
			const email = validarEmail(value);
			if (!email) return 'Email inválido';
			return undefined;
		}
	},
	password: {
		type: 'String',
		label: 'Senha',
		optional: false,
		defaultValue: 'admin@mrb.com'
	}
};

export interface ISignIn extends IDoc {
	email: string;
	password: string;
}
