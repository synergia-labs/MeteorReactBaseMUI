import { enumStorageMethods } from "../common/enums/methods.enum";
import { GetStorageBase } from "./bases/get";
import { IContext } from "../../../types/context";
import fs from "fs";
import { previewCsv } from "../utils/previewCsvFiles";
import { previewTextFile } from "../utils/previewTextFiles";
import { previewWord } from "../utils/previewWordFile";
import { previewExcel } from "../utils/previewExcelFile";
import { previewCss } from "../utils/previewCssFiles";
import { IArchive } from "../common/types/archive.type";
import { previewDefaultFile } from "../utils/previewDefaultFile";
import { ParamGetArchiveType, ReturnGetArchiveType } from "../common/types/getArchive";
import enumUserRoles from "../../../modules/userprofile/common/enums/enumUserRoles";

class GetDocument extends GetStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.getDocument,
			roles: [enumUserRoles.ADMIN, enumUserRoles.USER],
			canRegister: false
		});
	}

	private async handlePreview(file: IArchive, res: any, req: any) {
		try {
			switch (file.type) {
				case "text/csv":
					await previewCsv(file, res, req);
					return false;

				case "text/xml":
				case "application/json":
					await previewTextFile(file, res, req);
					return false;

				case "application/msword":
				case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
					await previewWord(file, res, req);
					return false;

				case "application/vnd.ms-excel":
				case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
					await previewExcel(file, res, req);
					return false;

				case "text/css":
					await previewCss(file, res, req);
					return false;

				default:
					await previewDefaultFile(file, res, req);
					return false;
			}
		} catch (error) {
			console.error("Erro ao gerar prévia:", error);
			res.status(500).end("Erro ao gerar prévia");
			return false;
		}
	}

	async action(param: ParamGetArchiveType, _context: IContext): Promise<ReturnGetArchiveType> {
		const { response: res, request: req } = _context;
		const documentCollection = this.getServerInstance()?.getDocumentCollection();

		const file = await documentCollection?.findOneAsync({ _id: param._id });

		if (!file || !fs.existsSync(file.path)) {
			this.generateError({ _message: "Documento não encontrado" }, _context);
		}

		if (file?.meta?.isRestricted && (!_context.user?._id || _context.user._id !== file.meta.createdBy))
			this.generateError({ _message: "Você não tem permissão para acessar este documento" }, _context);

		const isForcedDownload = param.dl == 1;
		const withPreview = req.query.preview == 1;
		const canHander = !isForcedDownload && withPreview ? await this.handlePreview(file, res, req) : true;

		if (canHander && !res.headersSent) {
			const stat = fs.statSync(file.path);

			res.writeHead(200, {
				"Content-Type": file.type,
				"Content-Disposition": isForcedDownload ? `attachment; filename="${file.name}"` : "inline",
				"Content-Length": stat.size
			});

			const fileStream = fs.createReadStream(file.path);

			fileStream.on("error", (err) => {
				console.error("Erro no stream:", err);
				if (!res.headersSent) {
					res.status(500).end("Erro ao ler o arquivo");
				}
			});

			await fileStream.pipe(res);
		}

		return {} as ReturnGetArchiveType;
	}
}

export const getDocument = new GetDocument();
