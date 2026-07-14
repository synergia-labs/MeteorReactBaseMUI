import { Meteor } from 'meteor/meteor';

export function validarData(dataInicio: Date | number, dataFim: Date | number) {
	if (dataFim <= dataInicio) {
		throw new Meteor.Error(
			'Problema nos campos de data!',
			`Você digitou uma data de início igual ou posterior a data de término!`
		);
	}

	return true;
}
