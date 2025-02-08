// region Imports
import { Recurso } from '../config/recursos';
import { exampleSch, IExample } from './exampleSch';
import { userprofileServerApi } from '../../../modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '../../../api/productServerBase';

// endregion

class ExampleServerApi extends ProductServerBase<IExample> {
	constructor() {
		super('example', exampleSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		const self = this;

		this.addTransformedPublication(
			'exampleList',
			(filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { title: 1, type: 1, typeMulti: 1, createdat: 1 }
				});
			},
			async (doc: IExample & { nomeUsuario: string }) => {
				const userProfileDoc = await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc };
			}
		);

		this.addPublication('exampleDetail', (filter = {}) => {
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
		});

	// 	this.addRestEndpoint(
	// 		'view',
	// 		(params, options) => {
	// 			console.log('Params', params);
	// 			console.log('options.headers', options.headers);
	// 			return { status: 'ok' };
	// 		},
	// 		['post']
	// 	);

	// 	this.addRestEndpoint(
	// 		'view/:exampleId',
	// 		(params, _options) => {
	// 			console.log('Rest', params);
	// 			if (params.exampleId) {
	// 				return self
	// 					.defaultCollectionPublication(
	// 						{
	// 							_id: params.exampleId
	// 						},
	// 						{}
	// 					)
	// 					.fetch();
	// 			} else {
	// 				return { ...params };
	// 			}
	// 		},
	// 		['get']
	// 	);
	// }
	}
}

export const exampleServerApi = new ExampleServerApi();
