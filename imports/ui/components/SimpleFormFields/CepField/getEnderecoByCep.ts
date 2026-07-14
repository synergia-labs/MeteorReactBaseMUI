import { fetch } from 'meteor/fetch';

type CepCallback = (error: any, response: any) => void;

export const getEnderecoByCep = async (cepParam: string, callback: CepCallback): Promise<void> => {
	const cep = cepParam.replace(/\D/g, '');
	if (!/^[0-9]{8}$/.test(cep)) {
		callback('Formato de CEP inválido.', null);
		return;
	}

	try {
		const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
		if (!response.ok) throw new Error(`ViaCEP respondeu com status ${response.status}`);
		callback(null, await response.json());
	} catch (error) {
		callback(error, null);
	}
};
