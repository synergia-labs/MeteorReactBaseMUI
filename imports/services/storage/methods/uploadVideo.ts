import { IContext } from "/imports/typings/IContext";
import { enumStorageMethods } from "../common/enums/methods.enum";
import storageServer from "../storage.server";
import { UploadStorageBase } from "./bases/upload";
import { Buffer } from "buffer";
import { enumFileType } from "../common/types/file.type";
import { ParamUploadArchiveType, ReturnUploadArchiveType } from "../common/types/uploadArchive";
import enumUserRoles from "../../../modules/userprofile/common/enums/enumUserRoles";

class UploadVideo extends UploadStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.uploadVideo,
			roles: [enumUserRoles.ADMIN, enumUserRoles.USER]
		});
	}

	async action(param: ParamUploadArchiveType, _context: IContext): Promise<ReturnUploadArchiveType> {
		const partialDoc = Object.fromEntries(Object.entries(param).filter(([key]) => key !== "archive"));
		const videoCollection = this.getServerInstance()?.getVideoCollection();

		// Faz o upload do arquivo na coleção de vídeos
		const objec = await videoCollection?.write(param.archive.content as Buffer, {
			meta: partialDoc,
			name: param.archive.name,
			type: param.archive.type,
			size: param.archive.size
		});

		if (!objec) {
			this.generateError({ _message: "Failed to upload video" }, _context);
		}

		const path = storageServer.getUrl({
			_id: objec._id,
			type: enumFileType.enum.VIDEO
		});

		return { _id: objec._id, path: path };
	}
}

export const uploadVideo = new UploadVideo();
