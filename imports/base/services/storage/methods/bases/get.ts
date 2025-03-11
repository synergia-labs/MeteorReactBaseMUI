import {
	paramGetArchiveSch,
	ParamGetArchiveType,
	returnGetArchiveSch,
	ReturnGetArchiveType
} from '../../common/types/crudArchive.type';
import { StorageServer } from '../../storage.server';
import MethodBase, { IMethodBase } from '/imports/base/server/methods/method.base';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';

export abstract class GetStorageBase extends MethodBase<StorageServer, ParamGetArchiveType, ReturnGetArchiveType> {
	constructor(props: Omit<IMethodBase, 'paramSch' | 'returnSch'>) {
		super({
			paramSch: paramGetArchiveSch,
			returnSch: returnGetArchiveSch,
			roles: [EnumUserRoles.ADM],
			...props
		});
	}

	protected beforeAction(_param: ParamGetArchiveType, _context: IContext): void {
		if (_param.access) {
			_context.user._id = _param.access;
		}
		super.beforeAction(_param, _context);
	}
}
