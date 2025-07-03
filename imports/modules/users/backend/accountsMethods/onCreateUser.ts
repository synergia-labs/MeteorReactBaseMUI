import MethodBase from "/imports/base/server/methods/method.base";
import { UsersServer } from "../server";
import { onCreateUserSchema, OnCreateUserType } from "../../common/types/onCreateUser";
import { meteorUserSchema } from "../../common/types/meteorUser";
import { Meteor } from "meteor/meteor";
import enumUserRoles from "../../common/enums/enumUserRoles";

class OnCreateUserMethod extends MethodBase<UsersServer, OnCreateUserType, Meteor.User> {
	constructor() {
		super({
			name: "accounts.onCreateUser",
			paramSch: onCreateUserSchema,
			returnSch: meteorUserSchema,
			canRegister: false
		});
	}

	async beforeAction(_props: OnCreateUserType) {
		return;
	}
	action({ user }: OnCreateUserType): Meteor.User {
		if (!user.profile) this.generateError({ key: "profileNotFound", code: "400" });
		if (!user.profile?.roles) user.profile!.roles = [enumUserRoles.USER];
		return user;
	}
}

const onCreateUserInstance = new OnCreateUserMethod();
export default onCreateUserInstance;
