import { enumStorageMethods } from '../common/enums/methods.enum';
import {
	paramGetArchiveSch,
	ParamGetArchiveType,
	returnGetArchiveSch,
	ReturnGetArchiveType
} from '../common/types/crudArchive.type';
import { StorageServer } from '../storage.server';
import { GetStorageBase } from './bases/get';
import MethodBase from '/imports/base/server/methods/method.base';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';

class GetImage extends GetStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.getImage,
			roles: [EnumUserRoles.PUBLIC]
		});
	}

	action(param: ParamGetArchiveType, _context: IContext): ReturnGetArchiveType {
		console.log('Passou aqui: ', param);

		return { url: 'teste' };
	}
}
export const getImage = new GetImage();
