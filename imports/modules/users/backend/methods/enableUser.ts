import { UsersServer } from "../server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import { z } from "zod";
import enumUsersRegisterMethods from "../../common/enums/enumRegisterMethods";

class EnableUser extends MethodBase<UsersServer, string, undefined> {
	constructor() {
		super({
			name: enumUsersRegisterMethods.enableUser,
			paramSch: z.string()
		});
	}

	async action(userId: string, context: IContext): Promise<undefined> {
		if (userId === context.user._id) this.generateError({ key: "userCannotEnableSelf", code: "400" });

		const mongoInstance = this.getServerInstance(context).getMongo();

		const user = await mongoInstance.findOneAsync({ _id: userId });
		if (!user) this.generateError({ key: "notFound", code: "404" });

		if (!!!user?.profile?.disabled) this.generateError({ key: "userAlreadyEnabled", code: "400" });

		await mongoInstance.updateAsync(
			{ _id: userId },
			{
				$set: {
					"profile.disabled": false,
					"profile.updatedAt": new Date(),
					"profile.updatedBy": context.user._id
				}
			}
		);
	}
}

const enableUser = new EnableUser();
export default enableUser;
