import {
	paramUploadArchiveSch,
	ParamUploadArchiveType,
	returnUploadArchiveSch,
	ReturnUploadArchiveType
} from "../../common/types/uploadArchive";
import { StorageServer } from "../../storage.server";
import { CreateMethodBase } from "/imports/base/server/methods/create.method.base";
import { IMethodBase } from "/imports/base/server/methods/method.base";
import { AuditType } from "/imports/base/types/audit";
import enumUserRoles from "../../../../../modules/userprofile/common/enums/enumUserRoles";
import { IContext } from "/imports/typings/IContext";
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
		super.beforeAction(_param as ParamUploadArchiveType & AuditType, _context);
		_param.archive.content = Buffer.from(_param.archive.content as string, "base64");
	}
}
