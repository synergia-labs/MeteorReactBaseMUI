import { IUserProfile } from '../modules/userprofile/api/userProfileSch';
import { IConnection } from './IConnection';
import { ISchema } from './ISchema';
import { Validador } from '../libs/Validador';

export interface IContext {
	user: IUserProfile;
	apiName: string;
	action: string;
	session: any;
	docId?: string;
	rest?: any;
	connection?: IConnection;
	request?: any;
	response?: any;
}
