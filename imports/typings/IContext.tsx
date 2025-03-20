import { IConnection } from "./IConnection";
import { Meteor } from "meteor/meteor";

export interface IContext {
	apiName: string;
	user: Meteor.User;
	action: string;
	meteorInstance?: Subscription | Meteor.MethodThisType;
	request?: any;
	response?: any;
}
