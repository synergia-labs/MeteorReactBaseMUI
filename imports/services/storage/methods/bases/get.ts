import {
	paramGetArchiveSch,
	ParamGetArchiveType,
	returnGetArchiveSch,
	ReturnGetArchiveType
} from "../../common/types/getArchive";
import { StorageServer } from "../../storage.server";
import MethodBase, { IMethodBase } from "/imports/base/server/methods/method.base";
import enumUserRoles from "../../../../modules/userprofile/common/enums/enumUserRoles";
import { IContext } from "/imports/typings/IContext";

export abstract class GetStorageBase extends MethodBase<StorageServer, ParamGetArchiveType, ReturnGetArchiveType> {
	constructor(props: Omit<IMethodBase, "paramSch" | "returnSch">) {
		super({
			paramSch: paramGetArchiveSch,
			returnSch: returnGetArchiveSch,
			roles: [enumUserRoles.ADMIN],
			...props
		});
	}

	protected async beforeAction(_param: ParamGetArchiveType, _context: IContext): Promise<void> {
		if (_param.access) {
			//TODO GABRIEL: Rever esse código
			// const user = (await userprofileServerApi.findOne({ _id: _param.access })) as IUserProfile;
			// if (user) _context.user = user;

			_context.user._id = _param.access;
		}
		super.beforeAction(_param, _context);
	}
}
