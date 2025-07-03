import { enumSecurityConfig } from "../../common/enums/config";
import { enumSecurityPublications } from "../../common/enums/publications";
import { paramGetAllSch, ParamGetAllType, returnGetMethodSch, ReturnGetMethodType } from "../../common/types/get";
import { SecurityServer } from "../security.server";
import PublicationBase from "/imports/base/server/publication/publication.base";
import { IContext } from "../../../../types/context";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

class GetAllMethodsPublication extends PublicationBase<SecurityServer, ParamGetAllType, ReturnGetMethodType> {
	constructor() {
		super({
			name: enumSecurityPublications.getAllMethodsPublication,
			roles: [enumUserRoles.ADMIN],
			paramSch: paramGetAllSch,
			returnSch: returnGetMethodSch,
			enableCountPublication: true,
			transformedPublication: false
		});
	}

	async action(
		_params: ParamGetAllType,
		_options: Mongo.Options<ReturnGetMethodType>,
		_context: IContext
	): Promise<any> {
		const server = this.getServerInstance().getMethodCollection();

		const referredVarCursor = await server.find({ referred: _params.referred }).fetch();
		const alreadyFound: Array<string> = referredVarCursor.map((doc) => doc.name);

		const cursor = server.find({
			$or: [{ referred: _params.referred }, { referred: enumSecurityConfig.API_NAME, name: { $nin: alreadyFound } }]
		});

		return cursor;
	}
}

export const getAllMethodsPublication = new GetAllMethodsPublication();
