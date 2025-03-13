import { IUserProfile } from '/imports/modules/userprofile/common/types/IUserProfile';


declare module 'meteor/meteor' { 
    namespace Meteor { 
        interface UserProfile extends IUserProfile{}
        interface UserServices {
            github?: {
                name: string;
                avatar: string;
                email: string;
            }
        }
    }
}