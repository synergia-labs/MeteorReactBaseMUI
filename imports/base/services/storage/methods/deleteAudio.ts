import { enumStorageMethods } from '../common/enums/methods.enum';
import { ParamDeleteArchiveType, ReturnDeleteArchiveType } from '../common/types/deleteArchive';
import { DeleteStorageBase } from './bases/delete';
import EnumUserRoles from '../../../../modules/userprofile/common/enums/enumUserRoles';
import { IContext } from '/imports/typings/IContext';

class DeleteAudio extends DeleteStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.deleteAudio,
			roles: [EnumUserRoles.ADMIN, EnumUserRoles.USER]
		});
	}

	async action(_param: ParamDeleteArchiveType, _context: IContext): Promise<ReturnDeleteArchiveType> {
		const audioCollection = this.getServerInstance()?.getAudioCollection();
		const file = await audioCollection?.findOneAsync({ _id: _param._id });

		if (!file) this.generateError({ _message: 'Áudio não encontrado' }, _context);
		if (file.meta?.isRestricted && file.meta?.createdBy !== _context.user._id)
			this.generateError({ _message: 'Você não tem permissão para deletar este áudio' }, _context);

		await audioCollection?.removeAsync({ _id: _param._id });

		return { message: 'Áudio deletado com sucesso' };
	}
}

export const deleteAudio = new DeleteAudio();
