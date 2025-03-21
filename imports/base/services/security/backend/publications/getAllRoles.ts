import { enumSecurityConfig } from "../../common/enums/config.enum";
import { enumSecurityPublications } from "../../common/enums/publications.enum";
import { paramGetAllSch, ParamGetAllType, returnGetRoleSch, ReturnGetRoleType } from "../../common/types/get";
import { SecurityServer } from "../security.server";
import PublicationBase from "/imports/base/server/publication/publication.base";
import enumUserRoles from "../../../../../modules/userprofile/common/enums/enumUserRoles";
import { IContext } from "/imports/typings/IContext";

class GetAllRolesPublication extends PublicationBase<SecurityServer, ParamGetAllType, ReturnGetRoleType> {
	constructor() {
		super({
			name: enumSecurityPublications.getAllRolesPublication,
			description: "Retorna todas as roles disponíveis para uma determinada referência",
			roles: [enumUserRoles.ADMIN],
			paramSch: paramGetAllSch,
			returnSch: returnGetRoleSch,
			enableCountPublication: true,
			transformedPublication: false
		});
	}

	async action(_params: ParamGetAllType, _options: Mongo.Options<ReturnGetRoleType>, _context: IContext): Promise<any> {
		const server = this.getServerInstance()?.getRoleCollection();
		if (!server) this.generateError({ _message: "Server não encontrado" }, _context);
		const alreadyFound: Array<string> = [];

		const referredVarCursor = await server!.find({ referred: _params.referred }).fetchAsync();
		referredVarCursor.forEach((doc) => {
			alreadyFound.push(doc.name);
		});

		const cursor = server!.find({
			$or: [{ referred: _params.referred }, { referred: enumSecurityConfig.API_NAME, name: { $nin: alreadyFound } }]
		});

		return cursor;
	}
}

export const getAllRolesPublication = new GetAllRolesPublication();
