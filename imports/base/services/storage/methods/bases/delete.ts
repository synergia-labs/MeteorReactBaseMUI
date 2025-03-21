import {
	paramDeleteArchiveSch,
	ParamDeleteArchiveType,
	returnDeleteArchiveSch,
	ReturnDeleteArchiveType
} from "../../common/types/deleteArchive";
import { StorageServer } from "../../storage.server";
import MethodBase, { IMethodBase } from "/imports/base/server/methods/method.base";
import enumUserRoles from "../../../../../modules/userprofile/common/enums/enumUserRoles";

export abstract class DeleteStorageBase extends MethodBase<
	StorageServer,
	ParamDeleteArchiveType,
	ReturnDeleteArchiveType
> {
	constructor(props: Omit<IMethodBase, "paramSch" | "returnSch">) {
		super({
			paramSch: paramDeleteArchiveSch,
			returnSch: returnDeleteArchiveSch,
			roles: [enumUserRoles.ADMIN],
			...props
		});
	}
}
