export function validarData(dataInicio, dataFim) {
	if (dataFim <= dataInicio) {
		throw new Meteor.Error(
			'Problema nos campos de data!',
			`Você digitou uma data de início igual ou posterior a data de término!`
		);
	}

	return true;
}
