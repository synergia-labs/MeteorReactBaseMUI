import { validarCPF } from '../../../libs/validaCPF';
import { validarEmail } from '../../../libs/validaEmail';
import { validarCNPJ } from '../../../libs/validarCNPJ';
import { IDoc } from '../../../typings/IDoc';
import { ISchema } from '../../../typings/ISchema';

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
	entertainment: {
		type: String,
		label: 'Entretenimento',
		optional: false,
		options: () => [
			{ label: 'Filme', value: 'filme' },
			{ label: 'Série', value: 'serie' },
			{ label: 'Livro', value: 'livro' },
			{ label: 'Música', value: 'musica' }
		]
	},
	date: {
		type: Date,
		label: 'Data do Filme',
		defaultValue: '',
		optional: false
	},
	arquivos: {
		type: [Object],
		label: 'Anexos',
		defaultValue: '',
		optional: true,
		isUpload: true
	},
	address: {
		type: Object,
		label: 'Localização',
		defaultValue: '',
		isMapLocation: true,
		optional: true
	},
	entertainmentSpecific: {
		type: String,
		label: 'Escolha uma das opções',
		defaultValue: '',
		optional: false,
		visibilityFunction: (doc: ISysFormTestsSch) => !!doc.entertainment,
		options: (doc: ISysFormTestsSch | undefined) => {
			if (!doc) return [];
			if (doc.entertainment === 'filme')
				return [
					{ label: 'Terror', value: 'terror' },
					{ label: 'Comédia', value: 'comedia' },
					{ label: 'Ação', value: 'acao' }
				];
			if (doc.entertainment === 'serie')
				return [
					{ label: 'Drama', value: 'drama' },
					{ label: 'Comédia', value: 'comedia' },
					{ label: 'Ação', value: 'acao' }
				];
			if (doc.entertainment === 'livro')
				return [
					{ label: 'Romance', value: 'romance' },
					{ label: 'Ficção', value: 'ficcao' },
					{ label: 'Aventura', value: 'aventura' }
				];
			if (doc.entertainment === 'musica')
				return [
					{ label: 'Rock', value: 'rock' },
					{ label: 'Pop', value: 'pop' },
					{ label: 'Sertanejo', value: 'sertanejo' }
				];
			return [];
		}
	},
	rating: {
		type: String,
		defaultValue: '',
		optional: true,
		label: 'Avaliação',
		options: () => {
			return [
				{ label: '1', value: '1' },
				{ label: '2', value: '2' },
				{ label: '3', value: '3' },
				{ label: '4', value: '4' },
				{ label: '5', value: '5' }
			];
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
	contacts: {
		type: Object,
		subSchema: {
			phone: {
				type: String,
				label: 'Telefone',
				optional: true,
				mask: '(##) ####-####'
			},
			cpf: {
				type: String,
				label: 'CPF',
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
			novoSubSchema: {
				type: Object,
				subSchema: {
					email: {
						type: String,
						label: 'Email',
						defaultValue: 'teste@teste.com',
						optional: false,
						visibilityFunction: (doc: any) => !!doc.type && doc.type === 'extra',
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
		}
	}
};

export interface ISysFormTestsSch extends IDoc {
	title: string;
	description: string;
	type: string;
	entertainment: 'filme' | 'serie' | 'livro' | 'musica';
	entertainmentSpecific: string;
	typeMulti: Array<string>;
	contacts: {
		phone: string;
		cpf: string;
	};
}
