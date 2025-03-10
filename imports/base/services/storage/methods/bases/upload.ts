import {
	paramUploadArchiveSch,
	ParamUploadArchiveType,
	returnUploadArchiveSch,
	ReturnUploadArchiveType
} from '../../common/types/crudArchive.type';
import { StorageServer } from '../../storage.server';
import { CreateMethodBase } from '/imports/base/server/methods/create.method.base';
import { IMethodBase } from '/imports/base/server/methods/method.base';
import { ArchiveType } from '/imports/base/types/archive';
import { AuditType } from '/imports/base/types/audit';
import { IContext } from '/imports/typings/IContext';
import { Buffer } from 'buffer';

export abstract class UploadStorageBase extends CreateMethodBase<
	StorageServer,
	ParamUploadArchiveType,
	ReturnUploadArchiveType
> {
	constructor(props: IMethodBase) {
		super({
			...props,
			paramSch: paramUploadArchiveSch,
			returnSch: returnUploadArchiveSch
		});
	}

	protected beforeAction(_param: ParamUploadArchiveType, _context: IContext): void {
		super.beforeAction(_param as ParamUploadArchiveType & AuditType, _context);
		_param.archive.content = Buffer.from(_param.archive.content as string, 'base64');
	}
}
