import enumUserRoles from "../../common/enums/enumUserRoles";
import { UsersServer } from "../server";
import PublicationBase from "/imports/base/server/publication/publication.base";
import { IContext } from "/imports/typings/IContext";
import enumUsersRegisterPublications from "../../common/enums/enumRegisterPublications";
import {
	GetUsersListParamType,
	GetUsersListReturnType,
	getUsersListParamSchema,
	getUsersListReturnSchema
} from "../../common/types/getUsersList";

class GetUsersListPublication extends PublicationBase<UsersServer, GetUsersListParamType, GetUsersListReturnType> {
	constructor() {
		super({
			name: enumUsersRegisterPublications.getUsersListPublication,
			description: "Retorna todos os usuários cadastrados no sistema",
			roles: [enumUserRoles.ADMIN],
			paramSch: getUsersListParamSchema,
			returnSch: getUsersListReturnSchema,
			enableCountPublication: true,
			transformedPublication: false
		});
	}

	async action(
		_params: GetUsersListParamType,
		_options: Mongo.Options<GetUsersListReturnType>,
		_context: IContext
	): Promise<any> {
		const server = this.getServerInstance();
		const mongoCollection = server?.mongoInstance;
		if (!mongoCollection || !server) this.generateError({ _message: "Server não definido", _code: "500" }, _context);

		return mongoCollection!.find(
			{},
			{
				fields: {
					"profile.name": 1,
					"emails": 1,
					"profile.roles": 1,
					"profile.connected": 1
				}
			}
		);
	}
}

export const getUsersListPublication = new GetUsersListPublication();
