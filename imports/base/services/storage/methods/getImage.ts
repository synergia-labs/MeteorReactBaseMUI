import { enumStorageMethods } from '../common/enums/methods.enum';
import { ParamGetArchiveType, ReturnGetArchiveType } from '../common/types/crudArchive.type';
import { enumResolution } from '../common/types/resolution.type';
import { StorageServer } from '../storage.server';
import { GetStorageBase } from './bases/get';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';
import fs from 'fs';
import sharp from 'sharp';

class GetImage extends GetStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.getImage,
			roles: [EnumUserRoles.PUBLIC]
		});
	}

	async action(param: ParamGetArchiveType, _context: IContext): Promise<ReturnGetArchiveType> {
		const file = await StorageServer.imageCollection.findOneAsync({ _id: param._id });

		if (!file) {
			throw new Error('File not found');
		}

		if (file?.meta?.isRestricted) {
			if (!_context.user._id) throw new Error('User not authenticated');
			if (_context.user._id != file.meta.createdBy) throw new Error('User not authorized');
		}
		console.log('file', file.meta);

		// Configurar o cabeçalho correto para exibir a imagem no navegador
		_context.response.setHeader('Content-Type', file.type);
		_context.response.setHeader('Content-Disposition', 'inline'); // Garante que a imagem seja exibida diretamente

		// Ler e enviar o arquivo como resposta
		let fileBuffer = fs.readFileSync(file.path);

		if (param.resolution && param.resolution !== enumResolution.enum.DEFAULT) {
			fileBuffer = await sharp(fileBuffer)
				.resize({ width: param.resolution as number }) // Redimensiona para a largura desejada, mantendo proporção
				.toBuffer();
		}

		_context.response.send(fileBuffer);

		return {
			url: 'sdf'
		};
	}
}
export const getImage = new GetImage();
