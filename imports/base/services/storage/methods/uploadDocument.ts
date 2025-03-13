import { IContext } from '/imports/typings/IContext';
import { enumStorageMethods } from '../common/enums/methods.enum';
import storageServer, { StorageServer } from '../storage.server';
import { UploadStorageBase } from './bases/upload';
import { Buffer } from 'buffer';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { enumFileType } from '../common/types/file.type';
import { ParamUploadArchiveType, ReturnUploadArchiveType } from '../common/types/uploadArchive';

class UploadDocument extends UploadStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.uploadDocument,
			roles: [EnumUserRoles.ADM, EnumUserRoles.USER]
		});
	}

	async action(param: ParamUploadArchiveType, _context: IContext): Promise<ReturnUploadArchiveType> {
		const partialDoc = Object.fromEntries(Object.entries(param).filter(([key]) => key !== 'archive'));
		const documentCollection = this.getServerInstance()?.getDocumentCollection();

		// Faz o upload do arquivo na coleção de documentos
		const objec = await documentCollection?.write(param.archive.content as Buffer, {
			meta: partialDoc,
			name: param.archive.name,
			type: param.archive.type,
			size: param.archive.size
		});

		if (!objec) {
			throw new Error('Failed to upload document');
		}

		const path = storageServer.getUrl({
			_id: objec._id,
			type: enumFileType.enum.DOCUMENT
		});

		return { _id: objec._id, path: path };
	}
}

export const uploadDocument = new UploadDocument();
