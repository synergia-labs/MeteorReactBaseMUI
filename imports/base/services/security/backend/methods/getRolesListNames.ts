import { enumSecurityMethods } from "../../common/enums/methods.enum";
import { SecurityServer } from "../security.server";
import MethodBase from "/imports/base/server/methods/method.base";
import enumUserRoles from "../../../../../modules/userprofile/common/enums/enumUserRoles";
import { z } from "zod";
import { IContext } from "/imports/typings/IContext";

class GetRolesListNamesMethod extends MethodBase<SecurityServer, void, Array<string>> {
	constructor() {
		super({
			name: enumSecurityMethods.getRolesListNames,
			returnSch: z.array(z.string()),
			roles: [enumUserRoles.PUBLIC],
			description: "Busca pelos perfis de usuário disponíveis no sistema."
		});
	}

	async action(_param: void, _context: IContext): Promise<Array<string>> {
		const roleCollection = this.getServerInstance()?.getRoleCollection();
		if (!roleCollection) this.generateError({ _message: "Role collection not found" }, _context);

		const roles = await roleCollection!.find({}, { fields: { name: 1 } }).fetch();

		return roles.map((role) => role.name);
	}
}

export const getRolesListNames = new GetRolesListNamesMethod();
