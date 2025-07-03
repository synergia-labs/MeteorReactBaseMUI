import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import { IContext } from "../../../../types/context";
import { UsersServer } from "../server";
import { UpdateMethodBase } from "/imports/base/server/methods/update.method.base";
import {
	upsertUserReturnSchema,
	UpsertUserReturnType,
	upsertUserSchema,
	UpsertUserType
} from "../../common/types/upsertUser";
import { hasValue } from "/imports/libs/hasValue";
import { Meteor } from "meteor/meteor";

class UpsertUser extends UpdateMethodBase<UsersServer, UpsertUserType, UpsertUserReturnType> {
	constructor() {
		super({
			name: enumUserProfileRegisterMethods.upsertUser,
			paramSch: upsertUserSchema,
			returnSch: upsertUserReturnSchema
		});
	}

	async action({ _id, email, profile, ...otherProps }: UpsertUserType, context: IContext) {
		const server = this.getServerInstance(context);
		const mongo = server.getMongo();

		const user = await mongo.findOneAsync(hasValue(_id) ? { _id } : { "emails.address": email }, {
			fields: { services: 0 }
		});

		if (user) return server.updateUser({ _id: user._id, email, ...otherProps }, context);

		if (!email)
			this.generateError(
				{ key: "missingParameters", params: { missingParameters: "email" }, namespace: "common" },
				context
			);
		if (!profile)
			this.generateError(
				{ key: "missingParameters", params: { missingParameters: "profile" }, namespace: "common" },
				context
			);

		return server.createUser(
			{
				_id,
				email: email!,
				profile: profile as Meteor.UserProfile,
				...otherProps
			},
			context
		);
	}
}

const upsertUser = new UpsertUser();
export default upsertUser;
