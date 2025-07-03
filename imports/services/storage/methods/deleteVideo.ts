import { enumStorageMethods } from "../common/enums/methods.enum";
import { ParamDeleteArchiveType, ReturnDeleteArchiveType } from "../common/types/deleteArchive";
import { DeleteStorageBase } from "./bases/delete";
import { IContext } from "../../../types/context";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

class DeleteVideo extends DeleteStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.deleteVideo,
			roles: [enumUserRoles.ADMIN, enumUserRoles.USER]
		});
	}

	async action(_param: ParamDeleteArchiveType, _context: IContext): Promise<ReturnDeleteArchiveType> {
		const videoCollection = this.getServerInstance(_context).getVideoCollection();
		const file = await videoCollection?.findOneAsync({ _id: _param._id });

		if (!file) this.generateError({ key: "videoNotFound" }, _context);
		if (file.meta?.isRestricted && file.meta?.createdBy !== _context.user._id)
			this.generateError({ key: "videoDeletePermissionDenied" }, _context);

		await videoCollection?.removeAsync({ _id: _param._id });

		return { message: "Vídeo deletado com sucesso" };
	}
}

export const deleteVideo = new DeleteVideo();
