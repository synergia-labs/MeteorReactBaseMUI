import { Meteor } from 'meteor/meteor';
import OAuthBase from '/imports/base/services/auth/oAuth.base';

export interface IServiceGoogleData {
	accessToken: string;
	idToken: string;
	scope: Array<string>;
	expiresAt: number;
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
}

class GoogleOAuth extends OAuthBase {
	constructor() {
		super('google', Meteor.settings.auth?.google?.clientId, Meteor.settings.auth?.google?.secret);
	}

	public async onUserMatched(serviceData: IServiceGoogleData): Promise<Meteor.User | null> {
		const user = (await Accounts.findUserByEmail(serviceData.email)) as Meteor.User;
		if(user && serviceData.picture)
			await Meteor.users.updateAsync({ _id: user._id }, { $set: { 'profile.photo': serviceData.picture } });
		return user ?? null;
	}
}

const googleOAuth = new GoogleOAuth();
export default googleOAuth;
