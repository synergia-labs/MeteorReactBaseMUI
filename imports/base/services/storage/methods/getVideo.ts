import { enumStorageMethods } from "../common/enums/methods.enum";
import { ParamGetArchiveType, ReturnGetArchiveType } from "../common/types/getArchive";
import { GetStorageBase } from "./bases/get";
import EnumUserRoles from "../../../../modules/userprofile/common/enums/enumUserRoles";
import { IContext } from "/imports/typings/IContext";
import fs from "fs";

class GetVideo extends GetStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.getVideo,
			roles: [EnumUserRoles.ADMIN, EnumUserRoles.USER],
			canRegister: false
		});
	}

	async action(param: ParamGetArchiveType, _context: IContext): Promise<ReturnGetArchiveType> {
		const videoCollection = this.getServerInstance()?.getVideoCollection();
		const file = await videoCollection?.findOneAsync({ _id: param._id });

		if (!file || !fs.existsSync(file.path)) {
			this.generateError({ _message: "Vídeo não encontrado" }, _context);
		}

		// Verifica se o vídeo é restrito
		if (file?.meta?.isRestricted) {
			if (!_context.user._id) this.generateError({ _message: "Usuário não autenticado" }, _context);
			if (_context.user._id !== file.meta.createdBy)
				this.generateError({ _message: "Você não tem permissão para acessar este vídeo" }, _context);
		}

		const stat = fs.statSync(file.path);
		const range = _context.request.headers.range; // Captura o range para streaming

		if (!range) {
			// Se não houver range, envia o arquivo completo
			_context.response.writeHead(200, {
				"Content-Type": file.type,
				"Content-Length": stat.size,
				"Content-Disposition": param.dl && param.dl == 1 ? "attachment" : "inline"
			});
			fs.createReadStream(file.path).pipe(_context.response);
			return {} as ReturnGetArchiveType;
		}

		// Tratamento de streaming com range
		const CHUNK_SIZE = 10 ** 6; // 1MB por chunk
		const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
		const start = parseInt(startStr, 10);
		const end = endStr ? parseInt(endStr, 10) : Math.min(start + CHUNK_SIZE, stat.size - 1);
		const contentLength = end - start + 1;

		_context.response.writeHead(206, {
			"Content-Range": `bytes ${start}-${end}/${stat.size}`,
			"Accept-Ranges": "bytes",
			"Content-Length": contentLength,
			"Content-Disposition": param.dl && param.dl == 1 ? `attachment; filename="${file.name}` : "inline",
			"Content-Type": file.type
		});

		const stream = fs.createReadStream(file.path, { start, end });

		stream.on("error", (err) => {
			console.error("Erro no stream de vídeo:", err);
			if (!_context.response.headersSent) {
				_context.response.status(500).send("Erro ao ler o arquivo de vídeo");
			}
		});

		stream.pipe(_context.response);

		return {} as ReturnGetArchiveType;
	}
}

export const getVideo = new GetVideo();
