import { ParamGetArchiveType, ReturnGetArchiveType } from '../common/types/crudArchive.type';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';
import { GetStorageBase } from './bases/get';
import { enumStorageMethods } from '../common/enums/methods.enum';

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
