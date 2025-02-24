import { Recurso } from '../config/recursos';
import { exampleSch, IExample } from './exampleSch';
import { ProductServerBase } from '../../../api/productServerBase';
import { exmpleListPublication } from './publications/exampleList.publication';
import { fillDatabaseWithFakeData, fillDatabaseWithFakeDataCallMethod, fillDatabaseWithFakeDataCallMethod2 } from '../api.test/fillDatabaseWithFakeData.callMethod';
import { exampleDetailPublication } from './publications/exampleDetail.publication';

class ExampleServerApi extends ProductServerBase<IExample> {
	numero: number;

	constructor() {
		super('example', exampleSch, { resources: Recurso });
		this.numero = 0;

		fillDatabaseWithFakeDataCallMethod.setServerBaseInstance(this);
		fillDatabaseWithFakeDataCallMethod2.setServerBaseInstance(this);

		this.addPublication('exampleList', this.exmpleListPublication );
		this.addPublication('exampleDetail', this.exampleDetailPublication);

		this.registerMethod('fillDatabaseWithFakeData', this.fillDatabase2);
	};

	exmpleListPublication = exmpleListPublication.bind(this);
	exampleDetailPublication = exampleDetailPublication.bind(this);
	fillDatabase = (...param: any) => fillDatabaseWithFakeDataCallMethod.execute(param);
	fillDatabase2 = (...param: any) => fillDatabaseWithFakeDataCallMethod2.execute(param);


	setNumero(numero: number){
		this.numero = numero;
	}

	getNumero(){
		return this.numero;
	}

	teste(){ console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>teste'); }


}

export const exampleServerApi = new ExampleServerApi();
export { ExampleServerApi };


/**Exemplo de utilização de um endpoint rest com meteor
 *
 *
	this.addRestEndpoint(
		'view',
		(params, options) => {
			console.log('Params', params);
			console.log('options.headers', options.headers);
			return { status: 'ok' };
		}, ['post']
	);

	this.addRestEndpoint(
		'view/:exampleId',
		(params, _options) => {
			console.log('Rest', params);
			if (params.exampleId) {
				return self
					.defaultCollectionPublication(
						{
							_id: params.exampleId
						},
						{}
					)
					.fetch();
			} else {
				return { ...params };
			}
		},['get']
	);
	}
 */
