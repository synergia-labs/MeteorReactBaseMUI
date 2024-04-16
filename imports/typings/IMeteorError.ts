import { Meteor } from 'meteor/meteor';

export interface IMeteorError extends Meteor.Error {
	details: string | undefined;
	error: string;
	errorType: string;
	isClientSafe: boolean;
	message: string;
	reason: string;
	stack: string;
}
