// region Imports
import { Meteor } from 'meteor/meteor';
import { OfflineBaseApi } from '../../../api/offlinebase';
import { userProfileSch } from './userProfileSch';
import { userprofileData } from '/imports/libs/getUser';
import { IMeteorError } from '/imports/typings/BoilerplateDefaultTypings';

// endregion

class UserProfileApi extends OfflineBaseApi {
	constructor() {
		super('userprofile', userProfileSch);
		this.insertNewUser = this.insertNewUser.bind(this);
		this.noImagePath = `${Meteor.absoluteUrl()}images/wireframe/user_no_photo.png`;
		// @ts-ignore
		userprofileData.collectionInstance = this.collectionInstance; //create globalvar userprofileData
	}

	insertNewUser(
		userData: { username: string; email: string; password?: string },
		callback = (e: Error, r: any) => {
			console.log(e, r);
		}
	) {
		this.callMethod('insert', userData, callback);
	}

	changeUserStatus(id: string, callback = (e: IMeteorError, r: any) => {}) {
		return this.callMethod('ChangeUserStatus', id, callback);
	}
}

export const userprofileApi = new UserProfileApi();
