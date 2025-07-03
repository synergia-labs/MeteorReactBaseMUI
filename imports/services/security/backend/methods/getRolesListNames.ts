import { enumSecurityMethods } from "../../common/enums/methods";
import { SecurityServer } from "../security.server";
import MethodBase from "/imports/base/server/methods/method.base";
import { z } from "zod";
import { IContext } from "../../../../types/context";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

class GetRolesListNamesMethod extends MethodBase<SecurityServer, void, Array<string>> {
	constructor() {
		super({
			name: enumSecurityMethods.getRolesListNames,
			returnSch: z.array(z.string()),
			roles: [enumUserRoles.PUBLIC]
		});
	}

	async action(_param: void, _context: IContext): Promise<Array<string>> {
		const roleCollection = this.getServerInstance(_context).getRoleCollection();
		const roles = await roleCollection.find({}, { fields: { name: 1 } }).fetch();
		return roles.map((role) => role.name);
	}
}

export const getRolesListNames = new GetRolesListNamesMethod();
