// region Imports
import { Recurso } from '../config/recursos';
import { exampleSch, IExample } from './exampleSch';
import { getUserServer } from '../../../modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '../../../api/productServerBase';
import { IMongoOptions } from '/imports/api/serverBase';
import { IFilterPublication, IOptionsPublication } from '/imports/typings/IFilterProperties';
import { IContext } from '/imports/typings/IContext';
import fakeTasks from '../fakeData/exampleFakeData';
// endregion

class ExampleServerApi extends ProductServerBase<IExample> {
	constructor() {
		super('example', exampleSch, { resources: Recurso });

		this.addPublication('exampleList', this.exmpleListPublication );

		this.addPublication('exampleDetail', (filter) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: {
					contacts: 1,
					title: 1,
					description: 1,
					type: 1,
					typeMulti: 1,
					date: 1,
					files: 1,
					chip: 1,
					statusRadio: 1,
					statusToggle: 1,
					slider: 1,
					check: 1,
					address: 1
				}
			});
		})

	
		this.fillDatabaseWithFakeData = this.fillDatabaseWithFakeData.bind(this);
		this.registerMethod('fillDatabaseWithFakeData', this.fillDatabaseWithFakeData);
	};

	/**
	 * Exemplo de publicação para recuperar a lista de tarefas.
	 * Regras:
	 * 		- Retorna apenas as tarefas do usuário logado.
	 * 
	 * @param filter Filtro para a consulta.
	 * @param optionsPub Opções para a consulta.
	 * @returns {Promise<Mongo.Cursor<IExample>>} Lista de tarefas.
	 * 
	 */
	exmpleListPublication = (
		filter?: IFilterPublication<IExample>, 
		optionsPub?: IOptionsPublication<IExample>
	): Promise<Mongo.Cursor<IExample>> => {
		const user = getUserServer();
		const subFilter = { ...filter, createdby: user._id };
		const subOptions: Partial<IMongoOptions<IExample>> = {
			...optionsPub,
			projection: { title: 1, type: 1, typeMulti: 1, createdat: 1 },
		};
		return this.defaultListCollectionPublication<IExample>(subFilter, subOptions);
	};

	/**
	 * Preenche o banco de dados com dados falsos.
	 * 
	 * @param {undefined} _ 		- Parâmetro não utilizado. 
	 * @param {IContext} context 	- Contexto da operação.
	 * @returns {Promise<void>} 	- Promessa de execução.
	 * 
	 */
	fillDatabaseWithFakeData = async (_: undefined, context: IContext) : Promise<void> => {
		for(const task of fakeTasks) await this.serverInsert(task, context);
	};
}

export const exampleServerApi = new ExampleServerApi();


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