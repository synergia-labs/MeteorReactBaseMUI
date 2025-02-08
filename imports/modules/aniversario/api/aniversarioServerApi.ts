// region Imports
import { Recurso } from '../config/recursos';
import { aniversarioSch, IAniversario } from './aniversarioSch';
import { ProductServerBase } from '/imports/api/productServerBase';

// endregion

class AniversarioServerApi extends ProductServerBase<IAniversario> {
	constructor() {
		super('aniversario', aniversarioSch, { resources: Recurso });

    const self = this;

		this.addPublication(
			'aniversarioList',
			(filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { name: 1, birthday: 1, phone: 1, remember: 1, delivery: 1 }
				});
			},
		);

		this.addPublication('aniversarioDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: { name: 1, birthday: 1, phone: 1, remember: 1, delivery: 1 }
			});
		});

		// this.addRestEndpoint(
		// 	'view',
		// 	(params, options) => {
        // //debug console.log
		// 		console.log('Params', params);
		// 		console.log('options.headers', options.headers);
		// 		return { status: 'ok' };
		// 	},
		// 	['post']
		// );

		// this.addRestEndpoint(
		// 	'view/:aniversarioId',
		// 	(params, _options) => {
		// 		console.log('Rest', params);
		// 		if (params.aniversarioId) {
		// 			return self
		// 				.defaultCollectionPublication(
		// 					{
		// 						_id: params.aniversarioId
		// 					},
		// 					{}
		// 				)
		// 				.fetch();
		// 		} else {
		// 			return { ...params };
		// 		}
		// 	},
		// 	['get']
		// );
	}
}

export const aniversarioServerApi = new AniversarioServerApi();
