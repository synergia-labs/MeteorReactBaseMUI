import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import ApiBase from "/imports/base/api/api.base";
import enumUsersRegisterMethods from "../common/enums/enumRegisterMethods";
import enumUsersRegisterPublications from "../common/enums/enumRegisterPublications";
import IUsersApiPublication from "../common/interfaces/publications";
import { UsersApiMethodsType } from "../common/interfaces/methods";

class UsersApi extends ApiBase {
	public mongoInstance: Mongo.Collection<Meteor.User>;

	constructor() {
		super(enumUsersRegisterMethods, enumUsersRegisterPublications);
		this.mongoInstance = Meteor.users;
	}

	resetForgotPassword = async (token: string, newPassword: string, callback: (error?: Error | Meteor.Error) => void) => {
		Accounts.resetPassword(token, newPassword, callback);
	};

	verifyEmail = async (token: string, callback: (error?: Error | Meteor.Error) => void) => {
		Accounts.verifyEmail(token, callback);
	};
}

type InterfaceWithMethodsType = UsersApiMethodsType & UsersApi & IUsersApiPublication;

const usersApi = new UsersApi() as InterfaceWithMethodsType;
export default usersApi;
export type { InterfaceWithMethodsType as ExampleApi };
