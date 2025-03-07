import { StorageService } from '../storage.service';
import {
	paramGetArchiveSch,
	ParamGetArchiveType,
	returnGetArchiveSch,
	ReturnGetArchiveType
} from '../types/crudArchive.type';
import MethodBase from '/imports/base/server/methods/method.base';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';

class GetFile extends MethodBase<StorageService, ParamGetArchiveType, ReturnGetArchiveType> {
	constructor() {
		super({
			name: 'createUser',
			roles: [EnumUserRoles.ADM, EnumUserRoles.USER],
			paramSch: paramGetArchiveSch,
			returnSch: returnGetArchiveSch
		});
	}

	action(param: ParamGetArchiveType, _context: IContext): ReturnGetArchiveType {
		console.log('Passou aqui: ', param);

		return { url: 'teste' };
	}
}
export const getFile = new GetFile();
