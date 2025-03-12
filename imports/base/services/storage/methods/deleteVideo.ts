import { enumStorageMethods } from '../common/enums/methods.enum';
import { ParamDeleteArchiveType, ReturnDeleteArchiveType } from '../common/types/crudArchive.type';
import { StorageServer } from '../storage.server';
import { DeleteStorageBase } from './bases/delete';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';

class DeleteVideo extends DeleteStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.deleteVideo,
			roles: [EnumUserRoles.ADM, EnumUserRoles.USER]
		});
	}

	async action(_param: ParamDeleteArchiveType, _context: IContext): Promise<ReturnDeleteArchiveType> {
		const file = await StorageServer.videoCollection.findOneAsync({ _id: _param._id });

		if (!file) throw new Error('Vídeo não encontrado');
		if (file.meta?.isRestricted && file.meta?.createdBy !== _context.user._id)
			throw new Error('Você não tem permissão para deletar este vídeo');

		await StorageServer.videoCollection.removeAsync({ _id: _param._id });

		return { message: 'Vídeo deletado com sucesso' };
	}
}

export const deleteVideo = new DeleteVideo();
