import enumUserProfileRegisterMethods from "../../common/enums/enumRegisterMethods";
import { IContext } from "../../../../types/context";
import { UsersServer } from "../server";
import { UpdateMethodBase } from "/imports/base/server/methods/update.method.base";
import storageServer from "/imports/services/storage/storage.server";
import { Meteor } from "meteor/meteor";
import {
	updatetUserReturnSchema,
	UpdatetUserReturnType,
	updatetUserSchema,
	UpdatetUserType
} from "../../common/types/updateUser";
import { hasValue } from "/imports/libs/hasValue";
import enumUserRoles from "../../common/enums/enumUserRoles";

class UpdateUser extends UpdateMethodBase<UsersServer, UpdatetUserType, UpdatetUserReturnType> {
	constructor() {
		super({
			name: enumUserProfileRegisterMethods.updateUser,
			paramSch: updatetUserSchema,
			returnSch: updatetUserReturnSchema
		});
	}

	protected insertAuditData(param: UpdatetUserType, _context: IContext): void {
		if (!param.profile) return;
		param.profile.updatedAt = new Date();
		param.profile.updatedBy = _context.user._id || Meteor.userId() || "System";
	}

	async beforeAction(props: UpdatetUserType, context: IContext) {
		await super.beforeAction(props, context);
		if (context.user.profile?.roles.includes(enumUserRoles.ADMIN)) return;
	}

	async action({ _id, profile, services, email }: UpdatetUserType, {}: IContext): Promise<UpdatetUserReturnType> {
		const mongo = this.getServerInstance().getMongo();

		const user = await mongo.findOneAsync(hasValue(_id) ? { _id } : { "emails.address": email });

		if (!user) this.generateError({ key: "notFound" });

		user!.profile = {
			...user?.profile,
			...(profile || {})
		} as Meteor.UserProfile;

		user!.services = {
			...user?.services,
			...(services || {})
		} as Meteor.UserServices;

		if (user?.profile?.photo && profile?.photo) await storageServer.deleteImage({ _id: user.profile.photo });

		await mongo.updateAsync(user!._id, {
			$set: {
				services: user!.services,
				profile: user!.profile
			}
		});

		delete user!.services;
		return user!;
	}
}

const updateUser = new UpdateUser();
export default updateUser;
