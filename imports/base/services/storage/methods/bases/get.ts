import {
	paramGetArchiveSch,
	ParamGetArchiveType,
	returnGetArchiveSch,
	ReturnGetArchiveType
} from '../../common/types/crudArchive.type';
import { StorageServer } from '../../storage.server';
import MethodBase, { IMethodBase } from '/imports/base/server/methods/method.base';
import { IUserProfile } from '/imports/modules/userprofile/api/userProfileSch';
import { userprofileServerApi } from '/imports/modules/userprofile/api/userProfileServerApi';
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

	protected async beforeAction(_param: ParamGetArchiveType, _context: IContext): Promise<void> {
		if (_param.access) {
			const user = (await userprofileServerApi.findOne({ _id: _param.access })) as IUserProfile;
			if (user) _context.user = user;

			_context.user._id = _param.access;
		}
		super.beforeAction(_param, _context);
	}
}
