import { Meteor } from "meteor/meteor";
import { GoogleServiceDataType, googleServiceDataSchema } from "../../../common/types/serviceGoogleData";
import OAuthBase from "../oAuth.base";

class GoogleOAuth extends OAuthBase<GoogleServiceDataType> {
	constructor() {
		super({
			serviceName: "google",
			clientId: Meteor.settings.auth?.google?.clientId,
			secret: Meteor.settings.auth?.google?.secret,
			schema: googleServiceDataSchema
		});
	}

	public async onUserMatched(serviceData: GoogleServiceDataType): Promise<Meteor.User | null> {
		const user = (await Accounts.findUserByEmail(serviceData.email)) as Meteor.User;
		if (user && serviceData.picture && user.profile?.photo === undefined)
			await Meteor.users.updateAsync({ _id: user._id }, { $set: { "profile.photo": serviceData.picture } });
		return user ?? null;
	}
}

const googleOAuth = new GoogleOAuth();
export default googleOAuth;
