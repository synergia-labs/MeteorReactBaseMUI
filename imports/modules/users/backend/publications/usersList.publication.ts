import enumUserRoles from "../../common/enums/enumUserRoles";
import { UsersServer } from "../server";
import PublicationBase from "/imports/base/server/publication/publication.base";
import { IContext } from "../../../../types/context";
import enumUsersRegisterPublications from "../../common/enums/enumRegisterPublications";
import { GetUsersListParamType, getUsersListParamSchema } from "../../common/types/getUsersList";
import { meteorUserSchema } from "../../common/types/meteorUser";
import { Meteor } from "meteor/meteor";
import storageServer from "/imports/services/storage/storage.server";
import { enumFileType } from "/imports/services/storage/common/types/file.type";
import { Mongo } from "meteor/mongo";
import mountUserMongoQuery from "../../utils/mountMongoUserQuery";
import { hasValue } from "/imports/libs/hasValue";

class GetUsersListPublication extends PublicationBase<UsersServer, GetUsersListParamType, Partial<Meteor.User>> {
	constructor() {
		super({
			name: enumUsersRegisterPublications.getUsersListPublication,
			roles: [enumUserRoles.ADMIN],
			paramSch: getUsersListParamSchema,
			returnSch: meteorUserSchema,
			enableCountPublication: true,
			transformedPublication: true
		});
	}

	async action(
		{ name, role }: GetUsersListParamType,
		{ limit, skip }: Mongo.Options<Meteor.User> = {},
		_context: IContext
	): Promise<Mongo.Cursor<Partial<Meteor.User>>> {
		const serverInstance = this.getServerInstance(_context);
		const mongoCollection = serverInstance.getMongo();

		return mongoCollection!.find(mountUserMongoQuery({ name, ...(hasValue(role) && { roles: [role!] }) }), {
			limit: limit || 10,
			skip: skip,
			fields: {
				"profile.name": 1,
				"emails": 1,
				"profile.photo": 1,
				"profile.roles": 1,
				"profile.connected": 1,
				"profile.disabled": 1
			},
			sort: {
				"profile.name": 1
			}
		});
	}

	async transformPublication(
		{ profile, services: _, ...otherProps }: Partial<Meteor.User>,
		_context: IContext
	): Promise<Partial<Meteor.User>> {
		let photoUrl: string | undefined;
		if (profile?.photo)
			photoUrl = await storageServer.getUrl({
				_id: profile?.photo,
				type: enumFileType.enum.IMAGE
			});
		return {
			...otherProps,
			profile: {
				...profile,
				photo: photoUrl
			} as Meteor.User["profile"]
		};
	}
}

export const getUsersListPublication = new GetUsersListPublication();
