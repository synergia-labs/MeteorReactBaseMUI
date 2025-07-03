import { IContext } from "../../../types/context";
import { enumStorageMethods } from "../common/enums/methods.enum";
import storageServer from "../storage.server";
import { UploadStorageBase } from "./bases/upload";
import { Buffer } from "buffer";
import { enumFileType } from "../common/types/file.type";
import { ParamUploadArchiveType, ReturnUploadArchiveType } from "../common/types/uploadArchive";
import enumUserRoles from "../../../modules/users/common/enums/enumUserRoles";

class UploadDocument extends UploadStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.uploadDocument,
			roles: [enumUserRoles.ADMIN, enumUserRoles.USER]
		});
	}

	async action(param: ParamUploadArchiveType, _context: IContext): Promise<ReturnUploadArchiveType> {
		const partialDoc = Object.fromEntries(Object.entries(param).filter(([key]) => key !== "archive"));
		const documentCollection = this.getServerInstance(_context).getDocumentCollection();

		// Faz o upload do arquivo na coleção de documentos
		const objec = await documentCollection?.write(param.archive.content as Buffer, {
			meta: partialDoc,
			name: param.archive.name,
			type: param.archive.type,
			size: param.archive.size
		});

		if (!objec) this.generateError({ key: "documentUploadFailed" }, _context);

		const path = storageServer.getUrl({
			_id: objec._id,
			type: enumFileType.enum.DOCUMENT
		});

		return { _id: objec._id, path: path };
	}
}

export const uploadDocument = new UploadDocument();
