import { IContext } from "/imports/typings/IContext";
import { enumStorageMethods } from "../common/enums/methods.enum";
import storageServer from "../storage.server";
import { UploadStorageBase } from "./bases/upload";
import { Buffer } from "buffer";
import { enumFileType } from "../common/types/file.type";
import { ParamUploadArchiveType, ReturnUploadArchiveType } from "../common/types/uploadArchive";
import EnumUserRoles from "../../../../modules/userprofile/common/enums/enumUserRoles";

class UploadAudio extends UploadStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.uploadAudio,
			roles: [EnumUserRoles.ADMIN, EnumUserRoles.USER]
		});
	}

	async action(param: ParamUploadArchiveType, _context: IContext): Promise<ReturnUploadArchiveType> {
		const partialDoc = Object.fromEntries(Object.entries(param).filter(([key]) => key !== "archive"));
		const audioCollection = this.getServerInstance()?.getAudioCollection();

		// Faz o upload do arquivo na coleção de áudios
		const objec = await audioCollection?.write(param.archive.content as Buffer, {
			meta: partialDoc,
			name: param.archive.name,
			type: param.archive.type,
			size: param.archive.size
		});

		if (!objec) {
			this.generateError({ _message: "Failed to upload audio"}, _context);
		}

		const path = storageServer.getUrl({
			_id: objec._id,
			type: enumFileType.enum.AUDIO
		});

		return { _id: objec._id, path: path };
	}
}

export const uploadAudio = new UploadAudio();
