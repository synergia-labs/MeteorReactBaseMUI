import ApiBase from "../../../../base/api/api.base";
import { Mongo } from "meteor/mongo";
import { MongoBase } from "/imports/base/database/mongo.base";
import EnumExampleSettings from "../../common";
import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import enumUserProfileRegisterPublications from "../../common/enums/enumRegisterPublications";
import EnumUserProfileSettings from "../../common";
import { UserProfileApiMethods } from "../../common/interfaces/methods";
import { Meteor } from "meteor/meteor";

class UserProfileApi extends ApiBase {
    public mongoInstance: MongoBase;

    constructor() {
        super(enumUserProfileRegisterMethods, enumUserProfileRegisterPublications);
        this.mongoInstance = new MongoBase(EnumUserProfileSettings.MODULE_NAME, Meteor.users);
    }
}


type interfaceWithMethods = UserProfileApiMethods & UserProfileApi;

const userProfileApi = new UserProfileApi() as interfaceWithMethods;
export default userProfileApi;
export type { interfaceWithMethods as ExampleApi  };