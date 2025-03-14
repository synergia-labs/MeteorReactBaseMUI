import { Meteor } from 'meteor/meteor';
import OAuthBase from '/imports/base/services/auth/oAuth.base';

export interface IServiceGithubData {
	accessToken: string;
	avatar: string;
	bio: string;
	blog: string;
	company: string;
	email: string;
	emails: Array<{ email: string; verified: boolean; primary: boolean; visibility: string }>;
	id: number;
	location: string;
	username: string;
}

class GithubOAuth extends OAuthBase {
	constructor() {
		super('github', Meteor.settings.auth?.github?.clientId, Meteor.settings.auth?.github?.secret);
	}

	public async onUserMatched(serviceData: IServiceGithubData): Promise<Meteor.User | null> {
		const user = (await Accounts.findUserByEmail(serviceData.email)) as Meteor.User;
		return user ?? null;
	}
}

const githubOAuth = new GithubOAuth();
export default githubOAuth;
