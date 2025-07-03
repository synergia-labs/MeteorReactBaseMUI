import { enumStorageMethods } from "../common/enums/methods.enum";
import { ParamDeleteArchiveType, ReturnDeleteArchiveType } from "../common/types/deleteArchive";
import { DeleteStorageBase } from "./bases/delete";
import { IContext } from "../../../types/context";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

class DeleteAudio extends DeleteStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.deleteAudio,
			roles: [enumUserRoles.ADMIN, enumUserRoles.USER]
		});
	}

	async action(_param: ParamDeleteArchiveType, _context: IContext): Promise<ReturnDeleteArchiveType> {
		const audioCollection = this.getServerInstance(_context).getAudioCollection();
		const file = await audioCollection?.findOneAsync({ _id: _param._id });

		if (!file) this.generateError({ key: "audioNotFound" }, _context);
		if (file.meta?.isRestricted && file.meta?.createdBy !== _context.user._id)
			this.generateError({ key: "audioDeletePermissionDenied" }, _context);

		await audioCollection?.removeAsync({ _id: _param._id });

		return { message: "Áudio deletado com sucesso" };
	}
}

export const deleteAudio = new DeleteAudio();
