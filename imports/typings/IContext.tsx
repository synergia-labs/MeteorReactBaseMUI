import { IUserProfile } from '../modules/userprofile/api/userProfileSch';
import { IConnection } from './IConnection';
import { ISchema } from './ISchema';
import { Validador } from '../libs/Validador';
import type { ClientSession } from 'mongodb';

export interface IContext {
	docId?: string;
	collection: string;
	action: string;
	user: IUserProfile;
	rest?: any;
	connection?: IConnection;
	validador: Validador;
	schema: ISchema<any>;
	session?: ClientSession;
}
