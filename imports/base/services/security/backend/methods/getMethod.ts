import { paramGetArchiveSch } from "../../../storage/common/types/getArchive";
import { enumSecurityConfig } from "../../common/enums/config.enum";
import { enumSecurityMethods } from "../../common/enums/methods.enum";
import { ParamGetType, returnGetMethodSch, ReturnGetMethodType } from "../../common/types/get";
import { SecurityServer } from "../security.server";
import MethodBase from "/imports/base/server/methods/method.base";
import enumUserRoles from "../../../../../modules/userprofile/common/enums/enumUserRoles";
import { IContext } from "/imports/typings/IContext";

class GetMethod extends MethodBase<SecurityServer, ParamGetType, ReturnGetMethodType> {
	constructor() {
		super({
			name: enumSecurityMethods.getMethod,
			paramSch: paramGetArchiveSch,
			returnSch: returnGetMethodSch,
			roles: [enumUserRoles.ADMIN],
			description: "Get method by name and referred"
		});
	}

	async action(_param: ParamGetType, _context: IContext): Promise<ReturnGetMethodType> {
		const methodCollection = this.getServerInstance()?.getMethodCollection();
		if (!methodCollection) this.generateError({ _message: "Method collection not found" }, _context);

		const _id = `${_param.referred ?? enumSecurityConfig.API_NAME}.${_param.name}`;
		const method = await methodCollection!.findOneAsync({ _id });
		if (!method) this.generateError({ _message: "Method not found" }, _context);

		if (method.isProtected && !_context.user.profile?.roles.includes(enumUserRoles.ADMIN))
			this.generateError({ _message: "Method is protected" }, _context);

		return method;
	}
}

export const getMethod = new GetMethod();
