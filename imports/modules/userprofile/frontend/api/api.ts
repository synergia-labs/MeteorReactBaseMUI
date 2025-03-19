import ApiBase from "../../../../base/api/api.base";
import { Mongo } from "meteor/mongo";
import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import enumUserProfileRegisterPublications from "../../common/enums/enumRegisterPublications";
import { Meteor } from "meteor/meteor";
import { UsersApiMethods } from "../../common/interfaces/methods";

class UsersApi extends ApiBase {
    public mongoInstance: Mongo.Collection<Meteor.User>;

    constructor() {
        super(enumUserProfileRegisterMethods, enumUserProfileRegisterPublications);
        this.mongoInstance = Meteor.users;
    }
}


type interfaceWithMethods = UsersApiMethods & UsersApi;

const usersApi = new UsersApi() as interfaceWithMethods;
export default usersApi;
export type { interfaceWithMethods as ExampleApi  };