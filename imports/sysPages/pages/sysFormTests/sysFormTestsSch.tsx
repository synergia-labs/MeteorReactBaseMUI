import { validarCPF } from '/imports/libs/validaCPF';
import { validarEmail } from '/imports/libs/validaEmail';
import { validarCNPJ } from '/imports/libs/validarCNPJ';
import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';

export const sysFormTestsSch: ISchema<ISysFormTestsSch> = {
	title: {
		type: String,
		label: 'Título',
		defaultValue: 'Teste',
		optional: false
	},
	type: {
		type: String,
		label: 'Tipo',
		defaultValue: '',
		optional: false,
		validationFunction: (value: string) => {
			const regexNumeros: RegExp = /-?\d+(\.\d+)?/g;
			if (value.length < 3) return 'Muito curto';
			if (value.match(regexNumeros)) return 'O texto deve conter apenas letras e espaços.';
			return undefined;
		}
	},
	typeMulti: {
		type: Array<String>,
		label: 'Tipos Multi',
		defaultValue: '',
		optional: false,
		multiple: true,
		visibilityFunction: (doc: any) => !!doc.type && doc.type === 'extra'
	},
	sexo: {
		type: String,
		label: 'Sexo',
		defaultValue: '',
		optional: false,
		options: [
			{ value: 'masculino', label: 'Masculino' },
			{ value: 'feminino', label: 'Feminino' }
		]
	},
	nivel: {
		type: String,
		label: 'Categoria',
		defaultValue: '1',
		optional: false,
		options: [
			{ value: '1', label: 'Nível 1' },
			{ value: '2', label: 'Nível 2' },
			{ value: '3', label: 'Nível 3' }
		]
	},
	contacts: {
		type: Object,
		label: 'Contatos',
		defaultValue: '',
		optional: true,
		subSchema: {
			phone: {
				type: String,
				label: 'Telefone',
				defaultValue: '37999767465',
				optional: true,
				mask: '(##) ####-####'
			},
			cpf: {
				type: String,
				label: 'CPF',
				defaultValue: '16187235614',
				optional: true,
				mask: '###.###.###-##',
				validationFunction: (value: string) => {
					if (!value) return undefined;
					const cpf = validarCPF(value);
					if (!cpf) return 'CPF inválido';
					return undefined;
				}
			},
			cnpj: {
				type: String,
				label: 'CNPJ',
				defaultValue: '12345678000199',
				optional: true,
				mask: '##.###.###/####-##',
				validationFunction: (value: string) => {
					if (!value) return undefined;
					const cnpj = validarCNPJ(value);
					if (!cnpj) return 'CNPJ inválido';
					return undefined;
				}
			},
			email: {
				type: String,
				label: 'Email',
				defaultValue: 'teste@teste.com',
				optional: true,
				mask: '',
				validationFunction: (value: string) => {
					if (!value) return undefined;
					const email = validarEmail(value);
					if (!email) return 'Email inválido';
					return undefined;
				}
			}
		}
	}
};

export interface ISysFormTestsSch extends IDoc {
	title: string;
	description: string;
	type: string;
	typeMulti: Array<string>;
	contacts: {
		phone: string;
		cpf: string;
	};
}