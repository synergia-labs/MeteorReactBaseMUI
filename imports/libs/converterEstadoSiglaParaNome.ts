/**
 * @param val sigla do estado
 */

const mapa = new Map();
mapa.set('AC', 'Ácre');
mapa.set('AL', 'Alagoas');
mapa.set('AM', 'Amazonas');
mapa.set('AP', 'Amapá');
mapa.set('BA', 'Bahia');
mapa.set('CE', 'Ceará');
mapa.set('DF', 'Distrito Federal');
mapa.set('ES', 'Espírito Santo');
mapa.set('GO', 'Goias');
mapa.set('MA', 'Maranhão');
mapa.set('MG', 'Minas Gerais');
mapa.set('MS', 'Mato Grosso do Sul');
mapa.set('MT', 'Mato Grosso');
mapa.set('PA', 'Pará');
mapa.set('PB', 'Paraíba');
mapa.set('PE', 'Pernambuco');
mapa.set('PI', 'Piauí');
mapa.set('PR', 'Parana');
mapa.set('RJ', 'Rio de Janeiro');
mapa.set('RN', 'Rio Grande do Norte');
mapa.set('RO', 'Rondonia');
mapa.set('RR', 'Roraima');
mapa.set('RS', 'Rio Grande do Sul');
mapa.set('SC', 'Santa Catarina');
mapa.set('SE', 'Sergipe');
mapa.set('SP', 'São Paulo');
mapa.set('TO', 'Tocantins');

export const converterSiglaParaNome = (val: string) => {
	return mapa.get(val.toUpperCase());
};
