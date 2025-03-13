import { enumStorageMethods } from '../common/enums/methods.enum';
import { ParamDeleteArchiveType, ReturnDeleteArchiveType } from '../common/types/deleteArchive';
import { DeleteStorageBase } from './bases/delete';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';

class DeleteAudio extends DeleteStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.deleteAudio,
			roles: [EnumUserRoles.ADM, EnumUserRoles.USER]
		});
	}

	async action(_param: ParamDeleteArchiveType, _context: IContext): Promise<ReturnDeleteArchiveType> {
		const audioCollection = this.getServerInstance()?.getAudioCollection();
		const file = await audioCollection?.findOneAsync({ _id: _param._id });

		if (!file) throw new Error('Áudio não encontrado');
		if (file.meta?.isRestricted && file.meta?.createdBy !== _context.user._id)
			throw new Error('Você não tem permissão para deletar este áudio');

		await audioCollection?.removeAsync({ _id: _param._id });

		return { message: 'Áudio deletado com sucesso' };
	}
}

export const deleteAudio = new DeleteAudio();
