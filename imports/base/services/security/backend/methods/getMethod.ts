import { paramGetArchiveSch } from "../../../storage/common/types/getArchive";
import { enumSecurityConfig } from "../../common/enums/config.enum";
import { enumSecurityMethods } from "../../common/enums/methods.enum";
import { ParamGetType, returnGetMethodSch, ReturnGetMethodType } from "../../common/types/get";
import { SecurityServer } from "../security.server";
import MethodBase from "/imports/base/server/methods/method.base";
import EnumUserRoles from "../../../../../modules/userprofile/common/enums/enumUserRoles";
import { IContext } from "/imports/typings/IContext";
import { useSecurity } from "../../frontend/security.provider";

class GetMethod extends MethodBase<SecurityServer, ParamGetType, ReturnGetMethodType> {
	constructor() {
		super({
			name: enumSecurityMethods.getMethod,
			paramSch: paramGetArchiveSch,
			returnSch: returnGetMethodSch,
			roles: [EnumUserRoles.ADMIN],
			description: "Get method by name and referred"
		});
	}

	async action(_param: ParamGetType, _context: IContext): Promise<ReturnGetMethodType> {
		useSecurity();
		const methodCollection = this.getServerInstance()?.getMethodCollection();
		if (!methodCollection) this.generateError({ _message: "Method collection not found", _context });

		const _id = `${_param.referred ?? enumSecurityConfig.apiName}.${_param.name}`;
		const method = await methodCollection!.findOneAsync({ _id });
		if (!method) this.generateError({ _message: "Method not found", _context });

		if (method.isProtected && !_context.user.profile?.roles.includes(EnumUserRoles.ADMIN))
			throw new Error("Unauthorized");

		return method;
	}
}

export const getMethod = new GetMethod();
