import { enumStorageMethods } from "../common/enums/methods.enum";
import { ParamGetArchiveType, ReturnGetArchiveType } from "../common/types/getArchive";
import { enumResolution } from "../common/types/resolution.type";
import { GetStorageBase } from "./bases/get";
import enumUserRoles from "../../../modules/userprofile/common/enums/enumUserRoles";
import { IContext } from "/imports/typings/IContext";
import fs from "fs";
import sharp from "sharp";

class GetImage extends GetStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.getImage,
			roles: [enumUserRoles.PUBLIC, enumUserRoles.ADMIN],
			canRegister: false
		});
	}

	async action(param: ParamGetArchiveType, _context: IContext): Promise<ReturnGetArchiveType> {
		const imageCollection = this.getServerInstance()?.getImageCollection();
		const file = await imageCollection?.findOneAsync({ _id: param._id });

		if (!file || !fs.existsSync(file.path)) {
			this.generateError({ _message: "Imagem não encontrada" }, _context);
		}

		if (file?.meta?.isRestricted) {
			if (!_context.user._id) this.generateError({ _message: "User not authorized" }, _context);
			if (_context.user._id != file.meta.createdBy) this.generateError({ _message: "User not authorized" }, _context);
		}

		// Configurar o cabeçalho correto para exibir a imagem no navegador
		_context.response.setHeader("Content-Type", file.type);
		_context.response.setHeader(
			"Content-Disposition",
			param.dl && param.dl == 1 ? `attachment; filename="${file.name}` : "inline"
		);

		// Ler e enviar o arquivo como resposta
		let fileBuffer = fs.readFileSync(file.path);

		if (param.resolution && param.resolution !== enumResolution.enum.DEFAULT) {
			fileBuffer = await sharp(fileBuffer)
				.resize({ width: param.resolution as number }) // Redimensiona para a largura desejada, mantendo proporção
				.toBuffer();
		}

		_context.response.send(fileBuffer);

		return {} as ReturnGetArchiveType;
	}
}
export const getImage = new GetImage();
