import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';
import {hasValue} from "/imports/libs/hasValue";

export const aniversarioSch: ISchema<IAniversario> = {
	name: {
		type: String,
		label: 'Nome',
		optional: false
	},
  birthday: {
    type: Date,
    label: 'Data de nascimento',
    optional: false
  },
  phone: {
    type: String,
    label: 'Telefone',
    optional: true,
    mask: '(##) ####-####'
  },
	remember: {
		type: Array<Boolean>,
		label: 'Lembrete',
    options: () => [
      { value: true, label: 'Enviar lembrete' },
    ],
		optional: true
	},
	delivery: {
		type: String,
		label: 'Quando enviar',
		optional: false,
    visibilityFunction: (doc: IAniversario) => hasValue(doc.remember),
		options: () => [
			{ value: '1', label: '1 dia antes' },
			{ value: '2', label: '2 dias antes' },
			{ value: '3', label: '3 dias antes' }
		]
	}
};

export interface IAniversario extends IDoc {
	name: string;
  birthday: Date;
  phone: string;
  remember: boolean;
  delivery: string;
}
