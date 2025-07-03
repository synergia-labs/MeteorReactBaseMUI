import { UsersServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { z } from "zod";
import enumUsersRegisterMethods from "../../common/enums/enumRegisterMethods";
import { Meteor } from "meteor/meteor";
import { userProfileSchema, UserProfileType } from "../../common/types/meteorUser";
import mountUserMongoQuery from "../../utils/mountMongoUserQuery";

class CountUsers extends MethodBase<UsersServer, Partial<UserProfileType> | undefined, number> {
	constructor() {
		super({
			name: enumUsersRegisterMethods.countUsers,
			paramSch: userProfileSchema.partial().optional(),
			returnSch: z.number()
		});
	}

	async action(users: Partial<UserProfileType> = {}, _context: IContext): Promise<number> {
		const searchQuery: Mongo.Query<Meteor.User> = mountUserMongoQuery(users) || {};
		return await this.getServerInstance().getMongo().find(searchQuery).countAsync();
	}
}

const countUsers = new CountUsers();
export default countUsers;
