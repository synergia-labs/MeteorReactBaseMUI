import { enumStorageMethods } from "../common/enums/methods.enum";
import { ParamGetArchiveType, ReturnGetArchiveType } from "../common/types/getArchive";
import { GetStorageBase } from "./bases/get";
import enumUserRoles from "../../../modules/userprofile/common/enums/enumUserRoles";
import { IContext } from "/imports/typings/IContext";
import fs from "fs";

class GetAudio extends GetStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.getAudio,
			roles: [enumUserRoles.ADMIN, enumUserRoles.USER],
			canRegister: false
		});
	}

	async action(param: ParamGetArchiveType, _context: IContext): Promise<ReturnGetArchiveType> {
		const audioCollection = this.getServerInstance()?.getAudioCollection();
		const file = await audioCollection?.findOneAsync({ _id: param._id });

		if (!file || !fs.existsSync(file.path)) {
			this.generateError({ _message: "Áudio não encontrado" }, _context);
		}

		// Verifica se o áudio é restrito
		if (file?.meta?.isRestricted) {
			if (!_context.user._id) this.generateError({ _message: "Usuário não autenticado" }, _context);
			if (_context.user._id !== file.meta.createdBy)
				this.generateError({ _message: "Você não tem permissão para acessar este áudio" }, _context);
		}

		// Obtém estatísticas do arquivo para Content-Length (opcional)
		const stat = fs.statSync(file.path);

		// Configurar cabeçalhos para streaming de áudio
		_context.response.writeHead(200, {
			"Content-Type": file.type,
			"Content-Disposition": param.dl && param.dl == 1 ? `attachment; filename="${file.name}` : "inline",
			"Content-Length": stat.size // Melhora performance
		});

		// Ler e enviar o arquivo como resposta
		const fileStream = fs.createReadStream(file.path);

		fileStream.on("error", (err) => {
			console.error("Erro no stream:", err);
			if (!_context.response.headersSent) {
				_context.response.status(500).send("Erro ao ler o arquivo");
			}
		});

		fileStream.pipe(_context.response);

		return {} as ReturnGetArchiveType;
	}
}

export const getAudio = new GetAudio();
