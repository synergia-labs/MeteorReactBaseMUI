import { paramGetArchiveSch } from "../../../storage/common/types/getArchive";
import { enumSecurityConfig } from "../../common/enums/config";
import { enumSecurityMethods } from "../../common/enums/methods";
import { ParamGetType, returnGetMethodSch, ReturnGetMethodType } from "../../common/types/get";
import { SecurityServer } from "../security.server";
import MethodBase from "/imports/base/server/methods/method.base";
import { IContext } from "../../../../types/context";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

class GetMethod extends MethodBase<SecurityServer, ParamGetType, ReturnGetMethodType> {
	constructor() {
		super({
			name: enumSecurityMethods.getMethod,
			paramSch: paramGetArchiveSch,
			returnSch: returnGetMethodSch,
			roles: [enumUserRoles.ADMIN]
		});
	}

	async action(_param: ParamGetType, _context: IContext): Promise<ReturnGetMethodType> {
		const methodCollection = this.getServerInstance(_context).getMethodCollection();

		const _id = `${_param.referred ?? enumSecurityConfig.API_NAME}.${_param.name}`;
		const method = await methodCollection.findOneAsync({ _id });
		if (!method) this.generateError({ key: "methodNotFound", params: { method: method } }, _context);

		if (method.isProtected && !_context.user.profile?.roles.includes(enumUserRoles.ADMIN))
			this.generateError({ key: "protectedMethod" }, _context);

		return method;
	}
}

export const getMethod = new GetMethod();
