import { IConnection } from './IConnection';
import { Meteor } from 'meteor/meteor';

export interface IContext {
	user: Meteor.User;
	apiName: string;
	action: string;
	session: any;
	docId?: string;
	rest?: any;
	connection?: IConnection;
	request?: any;
	response?: any;
}
