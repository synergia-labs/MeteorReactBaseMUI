import { UserProfileType, UserServiceType } from "../imports/modules/userprofile/common/types/meteorUser";

declare module "meteor/meteor" {
	namespace Meteor {
		interface UserProfile extends UserProfileType {}
		interface UserServices extends UserServiceType {}
	}
}
