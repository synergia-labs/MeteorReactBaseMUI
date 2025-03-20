import { IContext } from "/imports/typings/IContext";
import { enumStorageMethods } from "../common/enums/methods.enum";
import storageService, { StorageServer } from "../storage.server";
import { UploadStorageBase } from "./bases/upload";
import { Buffer } from "buffer";
import EnumUserRoles from "../../../../modules/userprofile/common/enums/enumUserRoles";
import storageServer from "../storage.server";
import { enumFileType } from "../common/types/file.type";
import { ParamUploadArchiveType, ReturnUploadArchiveType } from "../common/types/uploadArchive";

class UploadImage extends UploadStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.uploadImage,
			roles: [EnumUserRoles.ADMIN, EnumUserRoles.USER]
		});
	}

	async action(param: ParamUploadArchiveType, _context: IContext): Promise<ReturnUploadArchiveType> {
		const imageCollection = this.getServerInstance()?.getImageCollection();
		const partialDoc = Object.fromEntries(Object.entries(param).filter(([key]) => key !== "archive"));

		const objec = await imageCollection?.write(param.archive.content as Buffer, {
			meta: partialDoc,
			name: param.archive.name,
			type: param.archive.type,
			size: param.archive.size
		});

		if (!objec) {
			this.generateError({
				_message: "Failed to upload image",
				_context
			});
		}

		const path = storageServer.getUrl({
			_id: objec._id,
			type: enumFileType.enum.IMAGE
		});

		return { _id: objec._id, path: path };
	}
}

export const uploadImage = new UploadImage();
