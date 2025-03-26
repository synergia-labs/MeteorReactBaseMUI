import { Meteor } from "meteor/meteor";
import OAuthBase from "./oAuth.base";
import { githubServiceDataSchema, ServiceGithubDataType } from "../../common/types/serviceGithubData";
import { hasValue } from "/imports/libs/hasValue";

class GithubOAuth extends OAuthBase<ServiceGithubDataType> {
	constructor() {
		super({
			serviceName: "github",
			clientId: Meteor.settings.auth?.github?.clientId,
			secret: Meteor.settings.auth?.github?.secret,
			schema: githubServiceDataSchema
		});
	}

	public async onUserMatched(serviceData: ServiceGithubDataType): Promise<Meteor.User | null> {
		const user = (await Accounts.findUserByEmail(serviceData.email)) as Meteor.User;
		if (user && serviceData.avatar && !hasValue(user.profile?.photo))
			await Meteor.users.updateAsync({ _id: user._id }, { $set: { "profile.photo": serviceData.avatar } });
		return user ?? null;
	}
}

const githubOAuth = new GithubOAuth();
export default githubOAuth;
