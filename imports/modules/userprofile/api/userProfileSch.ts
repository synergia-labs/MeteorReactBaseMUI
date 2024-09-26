import { validarEmail } from '../../../libs/validaEmail';
import { IDoc } from '../../../typings/IDoc';
import { ISchema } from '../../../typings/ISchema';
import User = Meteor.User;

export const userProfileSch: ISchema<IUserProfile> = {
	photo: {
		type: String,
		label: 'Photo',
		defaultValue: '',
		optional: true,
		isImage: true
	},
	username: {
		type: String,
		label: 'Username',
		defaultValue: '',
		optional: false
	},
	email: {
		type: String,
		label: 'Email',
		defaultValue: '',
		optional: false,
		validationFunction: (value: string) => {
			if (!value) return undefined;
			const email = validarEmail(value);
			if (!email) return 'Email inválido';
			return undefined;
		}
	},
	phone: {
		type: String,
		label: 'Telefone',
		defaultValue: '',
		optional: true,
		mask: '(##) ####-####'
	},
	roles: {
		type: [String],
		label: 'Perfil de acesso',
		defaultValue: [],
		optional: true,
		options: () => [
			{
				value: ['Administrador'],
				label: 'Admnistrador'
			},
			{
				value: ['Usuario'],
				label: 'Usuário'
			}
		]
	},
	status: {
		type: [String],
		label: 'Status',
		defaultValue: 'disabled',
		optional: true,
		options: () => [
			{
				value: 'active',
				label: 'Ativo'
			},
			{
				value: 'disabled',
				label: 'Desativado'
			}
		]
	}
};

export interface IUserProfile extends IDoc {
	photo?: string;
	phone?: string;
	username: string;
	email: string;
	roles?: string[];
	status?: string;
}

export interface IMeteorUser extends User {
	services?: {
		password: {
			bcrypt: string; // Senha criptografada (bcrypt hash)
		};
		resume: {
			loginTokens: Array<{
				// Array de tokens de login
				when: Date;
				hashedToken: string;
			}>;
		};
		username: string; // Nome de usuário
	};
	emails: Array<{
		// Array de emails associados ao usuário
		address: string; // Endereço de email
		verified: boolean; // Email verificado ou não
	}>;
	profile?: {
		name: string; // Nome do perfil
		email: string; // Email no perfil
	};
}
