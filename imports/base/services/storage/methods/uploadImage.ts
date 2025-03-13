import { ParamUploadArchiveType, ReturnUploadArchiveType } from '../common/types/crudArchive.type';
import { IContext } from '/imports/typings/IContext';
import { enumStorageMethods } from '../common/enums/methods.enum';
import { StorageServer } from '../storage.server';
import { UploadStorageBase } from './bases/upload';
import { Buffer } from 'buffer';
import EnumUserRoles from '/imports/modules/userprofile/common/enums/enumUserRoles';

class UploadImage extends UploadStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.uploadImage,
			roles: [EnumUserRoles.ADMIN, EnumUserRoles.USER]
		});
	}

	async action(param: ParamUploadArchiveType, _context: IContext): Promise<ReturnUploadArchiveType> {
		const partialDoc = Object.fromEntries(Object.entries(param).filter(([key]) => key !== 'archive'));

		const objec = await StorageServer.imageCollection.write(param.archive.content as Buffer, {
			meta: partialDoc,
			name: param.archive.name,
			type: param.archive.type,
			size: param.archive.size
		});

		if (!objec) {
			throw new Error('Failed to upload image');
		}

		return { _id: objec._id };
	}
}

export const uploadImage = new UploadImage();
