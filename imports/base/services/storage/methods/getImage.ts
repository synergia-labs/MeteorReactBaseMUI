import { StorageMethods } from '../common/enums/methods.enum';
import { StorageService } from '../storage.server';
import {
	paramGetArchiveSch,
	ParamGetArchiveType,
	returnGetArchiveSch,
	ReturnGetArchiveType
} from '../common/types/crudArchive.type';
import MethodBase from '/imports/base/server/methods/method.base';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';

class GetImage extends MethodBase<StorageService, ParamGetArchiveType, ReturnGetArchiveType> {
	constructor() {
		super({
			name: StorageMethods.getImage,
			roles: [EnumUserRoles.PUBLIC],
			paramSch: paramGetArchiveSch,
			returnSch: returnGetArchiveSch
		});
	}

	action(param: ParamGetArchiveType, _context: IContext): ReturnGetArchiveType {
		console.log('Passou aqui: ', param);

		return { url: 'teste' };
	}
}
export const getFile = new GetImage();
