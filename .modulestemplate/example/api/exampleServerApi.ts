// region Imports
import { Recurso } from '../config/Recursos';
import { exampleSch, IExample } from './exampleSch';
import { userprofileServerApi } from '/imports/userprofile/api/UserProfileServerApi';
import { ProductServerBase } from '/imports/api/productServerBase';
// endregion

class ExampleServerApi extends ProductServerBase<IExample> {
    constructor() {
        super('example', exampleSch, {
            resources: Recurso,
        });

        this.addTransformedPublication(
            'exampleList',
            (filter = {}) => {
                return this.defaultListCollectionPublication(filter, {
                    projection: { image: 1, title: 1, description: 1, createdby: 1 },
                });
            },
            (doc: IExample & { nomeUsuario: string }) => {
                const userProfileDoc = userprofileServerApi
                    .getCollectionInstance()
                    .findOne({ _id: doc.createdby });
                return { ...doc, nomeUsuario: userProfileDoc?.username };
            }
        );

        this.addPublication('exampleDetail', (filter = {}) => {
            return this.defaultDetailCollectionPublication(filter, {});
        });
    }
}

export const exampleServerApi = new ExampleServerApi();
