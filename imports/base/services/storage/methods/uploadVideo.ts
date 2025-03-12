import { ParamUploadArchiveType, ReturnUploadArchiveType } from '../common/types/crudArchive.type';
import { IContext } from '/imports/typings/IContext';
import { enumStorageMethods } from '../common/enums/methods.enum';
import storageServer, { StorageServer } from '../storage.server';
import { UploadStorageBase } from './bases/upload';
import { Buffer } from 'buffer';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { enumFileType } from '../common/types/file.type';

class UploadVideo extends UploadStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.uploadVideo,
			roles: [EnumUserRoles.ADM, EnumUserRoles.USER]
		});
	}

	async action(param: ParamUploadArchiveType, _context: IContext): Promise<ReturnUploadArchiveType> {
		const partialDoc = Object.fromEntries(Object.entries(param).filter(([key]) => key !== 'archive'));

		// Faz o upload do arquivo na coleção de vídeos
		const objec = await StorageServer.videoCollection.write(param.archive.content as Buffer, {
			meta: partialDoc,
			name: param.archive.name,
			type: param.archive.type,
			size: param.archive.size
		});

		if (!objec) {
			throw new Error('Failed to upload video');
		}

		const path = storageServer.getUrl({
			_id: objec._id,
			type: enumFileType.enum.VIDEO
		});

		return { _id: objec._id, path: path };
	}
}

export const uploadVideo = new UploadVideo();
