import { fetch } from 'meteor/fetch';

async function getData(url, data) {
	const response = await fetch(url);
	try {
		return response.json();
	} catch (e) {
		console.log('Error API Correiors', e);
		return null;
	}
}

export const getEnderecoByCep = (cepParam, callback) => {
	//Nova variável "cep" somente com dígitos.
	const cep = cepParam.replace(/\D/g, '');

	//Verifica se campo cep possui valor informado.
	if (cep.trim().length > 0) {
		//Expressão regular para validar o CEP.
		const validacep = /^[0-9]{8}$/;

		//Valida o formato do CEP.
		if (validacep.test(cep)) {
			getData('//viacep.com.br/ws/' + cep + '/json')
				.then((r) => {
					callback(null, r);
				})
				.catch((e) => {
					console.log('ERROR', e);
					callback(e, null);
				});
		} //end if.
		else {
			callback('Formato de CEP inválido.', null);
		}
	} else {
		callback('Formato de CEP inválido.', null);
	}
};
