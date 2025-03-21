import { enumStorageMethods } from "../common/enums/methods.enum";
import { ParamDeleteArchiveType, ReturnDeleteArchiveType } from "../common/types/deleteArchive";
import { DeleteStorageBase } from "./bases/delete";
import enumUserRoles from "../../../../modules/userprofile/common/enums/enumUserRoles";
import { IContext } from "/imports/typings/IContext";

class DeleteDocument extends DeleteStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.deleteDocument,
			roles: [enumUserRoles.ADMIN, enumUserRoles.USER]
		});
	}

	async action(_param: ParamDeleteArchiveType, _context: IContext): Promise<ReturnDeleteArchiveType> {
		const documentCollection = this.getServerInstance()?.getDocumentCollection();
		const file = await documentCollection?.findOneAsync({ _id: _param._id });

		if (!file) this.generateError({ _message: "Documento não encontrado" }, _context);
		if (file.meta?.isRestricted && file.meta?.createdBy !== _context.user._id)
			throw this.generateError({ _message: "Você não tem permissão para deletar este documento" }, _context);

		await documentCollection?.removeAsync({ _id: _param._id });

		return { message: "Documento deletado com sucesso" };
	}
}

export const deleteDocument = new DeleteDocument();
