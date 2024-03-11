// region Imports
import { Meteor } from 'meteor/meteor';
import { OfflineBaseApi } from '../../../api/offlinebase';
import { IUserProfile, userProfileSch } from './UserProfileSch';
import { userprofileData } from '/imports/libs/getUser';

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
}

export const userprofileApi = new UserProfileApi();
