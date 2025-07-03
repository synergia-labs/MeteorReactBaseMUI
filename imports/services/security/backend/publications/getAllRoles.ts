import { enumSecurityConfig } from "../../common/enums/config";
import { enumSecurityPublications } from "../../common/enums/publications";
import { paramGetAllSch, ParamGetAllType, returnGetRoleSch, ReturnGetRoleType } from "../../common/types/get";
import { SecurityServer } from "../security.server";
import PublicationBase from "/imports/base/server/publication/publication.base";
import { IContext } from "../../../../types/context";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

class GetAllRolesPublication extends PublicationBase<SecurityServer, ParamGetAllType, ReturnGetRoleType> {
	constructor() {
		super({
			name: enumSecurityPublications.getAllRolesPublication,
			roles: [enumUserRoles.ADMIN],
			paramSch: paramGetAllSch,
			returnSch: returnGetRoleSch,
			enableCountPublication: true,
			transformedPublication: false
		});
	}

	async action(_params: ParamGetAllType, _options: Mongo.Options<ReturnGetRoleType>, _context: IContext): Promise<any> {
		const server = this.getServerInstance(_context).getRoleCollection();

		const referredVarCursor = await server.find({ referred: _params.referred }).fetchAsync();
		const alreadyFound: Array<string> = referredVarCursor.map((doc) => doc.name);

		const cursor = server.find({
			$or: [{ referred: _params.referred }, { referred: enumSecurityConfig.API_NAME, name: { $nin: alreadyFound } }]
		});

		return cursor;
	}
}

export const getAllRolesPublication = new GetAllRolesPublication();
