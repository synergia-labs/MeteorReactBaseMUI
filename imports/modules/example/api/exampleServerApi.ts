// region Imports
import { Recurso } from '../config/recursos';
import { exampleSch, IExample } from './exampleSch';
import { userprofileServerApi } from '../../../modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '../../../api/productServerBase';
import { IUserProfile } from '../../userprofile/api/userProfileSch';
import { IContext } from '/imports/typings/IContext';

// endregion

class ExampleServerApi extends ProductServerBase<IExample> {
	constructor() {
		super('example', exampleSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		this.addPublication(
			'exampleList',
			(filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { title: 1, type: 1, typeMulti: 1, createdat: 1 }
				});
			},
		);

		this.addTransformedPublication(
			'exampleDetail', 
			async (filter = {}) => {
				return this.defaultDetailCollectionPublication(
					filter, 
					{
						projection: {
							title: 1,
							type: 1,
							description: 1,
							typeMulti: 1,
							check: 1,
							createdby: 1
						}
					}
				);
			},
			async (doc: Partial<IExample>) : Promise<Partial<IExample & {username: string} >> => {
				const user : IUserProfile = await userprofileServerApi.getCollectionInstance().findOneAsync({ 
					_id: doc.createdby 
				}, {
					fields: { username: 1 }
				});
				return {...doc, username: user?.username || "ERROR"};
			}
		);


		this.registerMethod("fillDatabae", this.fillDatabase.bind(this));
		this.registerMethod("editTasks", this.editTasks.bind(this));

	}

	public fillDatabase(limit: number, _context: IContext): Array<string>{
		const getObject = (index: number): Partial<IExample>  => ({
			title: `Tarefa ${index}`,
			description: 'Teste',
			type: 'Categoria A',
			typeMulti: 'alta'
		})

		const taskNames: Array<string> = [];

		for(let i = 0; i < limit; i++){
			const task = getObject(i);
			this.serverInsert(task, _context);
			taskNames.push(task?.title || "ERROR");
		}

		return taskNames;
	}

	public async editTasks(baseName: string, _context: IContext): Promise<void> {
		const docs = await this.getCollectionInstance().find({}).fetchAsync();
		for(let i = 0; i < docs.length; i++){
			if(!docs[i]._id) throw new Meteor.Error("ID not found");
			await this.serverUpdate({
				...docs[i],
				title: `${baseName} ${i}`,
			}, _context);
		}

	}
}

export const exampleServerApi = new ExampleServerApi();


// Backup

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