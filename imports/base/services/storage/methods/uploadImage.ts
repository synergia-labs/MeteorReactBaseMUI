import { StorageMethods } from '../common/storage.enum';
import { StorageService } from '../storage.service';
import {
	paramUploadArchiveSch,
	ParamUploadArchiveType,
	returnUploadArchiveSch,
	ReturnUploadArchiveType
} from '../types/crudArchive.type';
import MethodBase from '/imports/base/server/methods/method.base';
import { IContext } from '/imports/typings/IContext';

class UploadImage extends MethodBase<StorageService, ParamUploadArchiveType, ReturnUploadArchiveType> {
	constructor() {
		super({
			name: StorageMethods.uploadImage,
			roles: [],
			paramSch: paramUploadArchiveSch,
			returnSch: returnUploadArchiveSch
		});
	}

	action(param: ParamUploadArchiveType, _context: IContext): ReturnUploadArchiveType {
		console.log('Passou aqui: ', param);

		return {};
	}
}
