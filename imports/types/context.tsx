import { Meteor } from "meteor/meteor";
import enumSupportedLanguages from "../services/internationalization/common/enum/supportedLanguages";

export interface IContext {
	apiName: string;
	user: Meteor.User;
	action: string;
	meteorInstance?: Subscription | Meteor.MethodThisType;
	language?: enumSupportedLanguages;
	request?: any;
	response?: any;
}
