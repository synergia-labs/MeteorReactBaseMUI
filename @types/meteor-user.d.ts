import { IUserProfile } from '/imports/modules/userprofile/common/types/IUserProfile';
import IUserServices from '/imports/modules/userprofile/common/types/IUserServices';

declare module 'meteor/meteor' { 
    namespace Meteor { 
        interface UserProfile extends IUserProfile{}
        interface UserServices extends IUserServices {}
    }
}