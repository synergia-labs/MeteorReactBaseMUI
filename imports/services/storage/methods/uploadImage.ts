import { IContext } from "../../../types/context";
import { enumStorageMethods } from "../common/enums/methods.enum";
import { UploadStorageBase } from "./bases/upload";
import { Buffer } from "buffer";
import enumUserRoles from "../../../modules/users/common/enums/enumUserRoles";
import storageServer from "../storage.server";
import { enumFileType } from "../common/types/file.type";
import { ParamUploadArchiveType, ReturnUploadArchiveType } from "../common/types/uploadArchive";

class UploadImage extends UploadStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.uploadImage,
			roles: [enumUserRoles.ADMIN, enumUserRoles.USER]
		});
	}

	async action(param: ParamUploadArchiveType, _context: IContext): Promise<ReturnUploadArchiveType> {
		const imageCollection = this.getServerInstance(_context).getImageCollection();
		const partialDoc = Object.fromEntries(Object.entries(param).filter(([key]) => key !== "archive"));

		const objec = await imageCollection?.writeAsync(param.archive.content as Buffer, {
			meta: partialDoc,
			name: param.archive.name,
			type: param.archive.type,
			size: param.archive.size
		});

		if (!objec) this.generateError({ key: "imageUploadFailed" }, _context);

		const path = storageServer.getUrl({
			_id: objec._id,
			type: enumFileType.enum.IMAGE
		});

		return { _id: objec._id, path: path };
	}
}

export const uploadImage = new UploadImage();
