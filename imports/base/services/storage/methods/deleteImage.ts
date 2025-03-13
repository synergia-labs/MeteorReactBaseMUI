import { enumStorageMethods } from '../common/enums/methods.enum';
import { ParamDeleteArchiveType, ReturnDeleteArchiveType } from '../common/types/crudArchive.type';
import { StorageServer } from '../storage.server';
import { DeleteStorageBase } from './bases/delete';
import EnumUserRoles from '/imports/modules/userprofile/common/enums/enumUserRoles';
import { IContext } from '/imports/typings/IContext';

class DeleteImage extends DeleteStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.deleteImage,
			roles: [EnumUserRoles.ADMIN]
		});
	}

	async action(_param: ParamDeleteArchiveType, _context: IContext): Promise<ReturnDeleteArchiveType> {
		const file = await StorageServer.imageCollection.findOneAsync({ _id: _param._id });

		if (!file) throw new Error('Imagem não encontrada');
		if (file.meta?.isRestricted && file.meta?.createdBy != _context.user._id)
			throw new Error('Você não tem permissão para deletar essa imagem');

		await StorageServer.imageCollection.removeAsync({ _id: _param._id });

		return { message: 'Imagem deletada com sucesso' };
	}
}

export const deleteImage = new DeleteImage();
