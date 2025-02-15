import { Recurso } from '../config/recursos';
import { exampleSch, IExample } from './exampleSch';
import { ProductServerBase } from '../../../api/productServerBase';
import { exmpleListPublication } from './publications/exampleList.publication';
import { fillDatabaseWithFakeData } from './callMethods/fillDatabaseWithFakeData.callMethod';
import { exampleDetailPublication } from './publications/exampleDetail.publication';
import { IContext } from '/imports/typings/IContext';

class ExampleServerApi extends ProductServerBase<IExample> {
	constructor() {
		super('example', exampleSch, { resources: Recurso });

		this.addPublication('exampleList', this.exmpleListPublication );
		this.addPublication('exampleDetail', exampleDetailPublication);

		this.registerMethod('fillDatabaseWithFakeData', this.fillDatabaseWithFakeData);
	};

	exmpleListPublication = exmpleListPublication.bind(this);
	exampleDetailPublication = exampleDetailPublication.bind(this);
	fillDatabaseWithFakeData = fillDatabaseWithFakeData.bind(this);
	
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