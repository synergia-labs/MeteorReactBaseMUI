import { IContext } from '/imports/typings/IContext';
import { enumStorageMethods } from '../common/enums/methods.enum';
import storageServer, { StorageServer } from '../storage.server';
import { UploadStorageBase } from './bases/upload';
import { Buffer } from 'buffer';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { enumFileType } from '../common/types/file.type';
import { ParamUploadArchiveType, ReturnUploadArchiveType } from '../common/types/uploadArchive';

class UploadAudio extends UploadStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.uploadAudio,
			roles: [EnumUserRoles.ADM, EnumUserRoles.USER]
		});
	}

	async action(param: ParamUploadArchiveType, _context: IContext): Promise<ReturnUploadArchiveType> {
		const partialDoc = Object.fromEntries(Object.entries(param).filter(([key]) => key !== 'archive'));
		const audioCollection = this.getServerInstance()?.getAudioCollection();

		// Faz o upload do arquivo na coleção de áudios
		const objec = await audioCollection?.write(param.archive.content as Buffer, {
			meta: partialDoc,
			name: param.archive.name,
			type: param.archive.type,
			size: param.archive.size
		});

		if (!objec) {
			throw new Error('Failed to upload audio');
		}

		const path = storageServer.getUrl({
			_id: objec._id,
			type: enumFileType.enum.AUDIO
		});

		return { _id: objec._id, path: path };
	}
}

export const uploadAudio = new UploadAudio();
