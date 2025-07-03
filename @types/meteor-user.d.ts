/* eslint-disable */

import { UserProfileType, UserServiceType } from "/imports/modules/users/common/types/meteorUser";

declare module "meteor/meteor" {
	namespace Meteor {
		interface UserProfile extends UserProfileType {}
		interface UserServices extends UserServiceType {}
		interface IMicrosoftLoginOptions {
			redirectUrl?: string;
			loginStyle?: "popup" | "redirect";
			requestPermissions?: string[];
			requestOfflineToken?: boolean;
			userEmail?: string;
			[key: string]: any;
		}

		type LoginCallbackType = (error?: Error | Meteor.Error | Meteor.TypedError) => void;

		function loginWithMicrosoft(options: IMicrosoftLoginOptions, callBack: LoginCallbackType): void;
	}
}

/* eslint-enable */
