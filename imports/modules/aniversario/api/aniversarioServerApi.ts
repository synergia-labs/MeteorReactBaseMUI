// region Imports
import { Recurso } from '../config/recursos';
import { aniversarioSch, IAniversario } from './aniversarioSch';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';

// endregion

class AniversarioServerApi extends ProductServerBase<IAniversario> {
	constructor() {
		super('aniversario', aniversarioSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		const self = this;

		this.addTransformedPublication(
			'aniversarioList',
			(filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { title: 1, type: 1, typeMulti: 1, createdat: 1 }
				});
			},
			(doc: IAniversario & { nomeUsuario: string }) => {
				const userProfileDoc = userprofileServerApi.getCollectionInstance().findOne({ _id: doc.createdby });
				return { ...doc };
			}
		);

		this.addPublication('aniversarioDetail', (filter = {}) => {
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

		this.addRestEndpoint(
			'view',
			(params, options) => {
				console.log('Params', params);
				console.log('options.headers', options.headers);
				return { status: 'ok' };
			},
			['post']
		);

		this.addRestEndpoint(
			'view/:aniversarioId',
			(params, _options) => {
				console.log('Rest', params);
				if (params.aniversarioId) {
					return self
						.defaultCollectionPublication(
							{
								_id: params.aniversarioId
							},
							{}
						)
						.fetch();
				} else {
					return { ...params };
				}
			},
			['get']
		);
	}
}

export const aniversarioServerApi = new AniversarioServerApi();
