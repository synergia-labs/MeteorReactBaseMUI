import ApiBase from "../../../../base/api/api.base";
import { Mongo } from "meteor/mongo";
import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import enumUserProfileRegisterPublications from "../../common/enums/enumRegisterPublications";
import { UserProfileApiMethods } from "../../common/interfaces/methods";
import { Meteor } from "meteor/meteor";

class UserProfileApi extends ApiBase {
    public mongoInstance: Mongo.Collection<Meteor.User>;

    constructor() {
        super(enumUserProfileRegisterMethods, enumUserProfileRegisterPublications);
        this.mongoInstance = Meteor.users;
    }
}


type interfaceWithMethods = UserProfileApiMethods & UserProfileApi;

const userProfileApi = new UserProfileApi() as interfaceWithMethods;
export default userProfileApi;
export type { interfaceWithMethods as ExampleApi  };