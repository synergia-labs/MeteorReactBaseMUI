import {
	paramUploadArchiveSch,
	ParamUploadArchiveType,
	returnUploadArchiveSch,
	ReturnUploadArchiveType
} from "../../common/types/uploadArchive";
import { StorageServer } from "../../storage.server";
import { CreateMethodBase } from "/imports/base/server/methods/create.method.base";
import { IMethodBase } from "/imports/base/server/methods/method.base";
import enumUserRoles from "../../../../modules/users/common/enums/enumUserRoles";
import { IContext } from "../../../../types/context";
import { Buffer } from "buffer";

export abstract class UploadStorageBase extends CreateMethodBase<
	StorageServer,
	ParamUploadArchiveType,
	ReturnUploadArchiveType
> {
	constructor(props: Omit<IMethodBase, "paramSch" | "returnSch">) {
		super({
			paramSch: paramUploadArchiveSch,
			returnSch: returnUploadArchiveSch,
			roles: [enumUserRoles.ADMIN],
			...props
		});
	}

	protected async beforeAction(_param: ParamUploadArchiveType, _context: IContext): Promise<void> {
		super.beforeAction(_param, _context);
		if (!Buffer.isBuffer(_param.archive.content))
			_param.archive.content = Buffer.from(_param.archive.content as string, "base64");
	}
}
