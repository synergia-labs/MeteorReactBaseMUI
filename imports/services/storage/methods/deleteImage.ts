import { enumStorageMethods } from "../common/enums/methods.enum";
import { ParamDeleteArchiveType, ReturnDeleteArchiveType } from "../common/types/deleteArchive";
import { DeleteStorageBase } from "./bases/delete";
import { IContext } from "../../../types/context";
import enumUserRoles from "/imports/modules/users/common/enums/enumUserRoles";

class DeleteImage extends DeleteStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.deleteImage,
			roles: [enumUserRoles.ADMIN, enumUserRoles.USER]
		});
	}

	async action(_param: ParamDeleteArchiveType, _context: IContext): Promise<ReturnDeleteArchiveType> {
		const imageCollection = this.getServerInstance(_context).getImageCollection();
		const file = await imageCollection?.findOneAsync({ _id: _param._id });

		if (!file) this.generateError({ key: "imageNotFound" }, _context);
		if (file.meta?.isRestricted && file.meta?.createdBy != _context.user._id)
			this.generateError({ key: "imageDeletePermissionDenied" }, _context);

		await imageCollection?.removeAsync({ _id: _param._id });

		return { message: "Imagem deletada com sucesso" };
	}
}

export const deleteImage = new DeleteImage();
