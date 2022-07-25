import { IUserProfile } from '../userprofile/api/UserProfileSch';
import { IConnection } from './IConnection';
import { ISchema } from './ISchema';
import { Validador } from '/imports/libs/Validador';

export interface IContext {
    docId?: string;
    collection: string;
    action: string;
    user: IUserProfile;
    rest?: any;
    connection?: IConnection;
    validador: Validador;
    schema: ISchema<any>;
    session: any;
}
