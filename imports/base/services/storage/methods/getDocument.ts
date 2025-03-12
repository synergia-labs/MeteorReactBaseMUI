import { enumStorageMethods } from '../common/enums/methods.enum';
import { ParamGetArchiveType, ReturnGetArchiveType } from '../common/types/crudArchive.type';
import { StorageServer } from '../storage.server';
import { GetStorageBase } from './bases/get';
import { EnumUserRoles } from '/imports/modules/userprofile/config/enumUser';
import { IContext } from '/imports/typings/IContext';
import fs from 'fs';
import { previewCsv } from '../utils/previewCsvFiles';
import { previewTextFile } from '../utils/previewTextFiles';
import { previewWord } from '../utils/previewWordFile';
import { previewExcel } from '../utils/previewExcelFile';
import { previewCss } from '../utils/previewCssFiles';
import { IArchive } from '../common/types/archive.type';
import { previewDefaultFile } from '../utils/previewDefaultFile';

class GetDocument extends GetStorageBase {
	constructor() {
		super({
			name: enumStorageMethods.getDocument,
			roles: [EnumUserRoles.ADM, EnumUserRoles.USER]
		});
	}

	private async handlePreview(file: IArchive, res: any, req: any) {
		try {
			switch (file.type) {
				case 'text/csv':
					await previewCsv(file, res, req);
					return false;

				case 'text/xml':
				case 'application/json':
					await previewTextFile(file, res, req);
					return false;

				case 'application/msword':
				case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
					await previewWord(file, res, req);
					return false;

				case 'application/vnd.ms-excel':
				case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
					await previewExcel(file, res, req);
					return false;

				case 'text/css':
					await previewCss(file, res, req);
					return false;

				default:
					await previewDefaultFile(file, res, req);
					return false;
			}
		} catch (error) {
			console.error('Erro ao gerar prévia:', error);
			res.status(500).end('Erro ao gerar prévia');
			return false;
		}
	}

	async action(param: ParamGetArchiveType, _context: IContext): Promise<ReturnGetArchiveType> {
		const { response: res, request: req } = _context;

		const file = await StorageServer.documentCollection.findOneAsync({ _id: param._id });

		if (!file || !fs.existsSync(file.path)) {
			throw new Error('Documento não encontrado');
		}

		if (file?.meta?.isRestricted && (!_context.user?._id || _context.user._id !== file.meta.createdBy))
			throw new Error('Acesso não autorizado');

		const isForcedDownload = param.dl == 1;
		const withPreview = req.query.preview == 1;
		const canHander = !isForcedDownload && withPreview ? await this.handlePreview(file, res, req) : true;

		if (canHander && !res.headersSent) {
			const stat = fs.statSync(file.path);

			res.writeHead(200, {
				'Content-Type': file.type,
				'Content-Disposition': isForcedDownload ? `attachment; filename="${file.name}"` : 'inline',
				'Content-Length': stat.size
			});

			const fileStream = fs.createReadStream(file.path);

			fileStream.on('error', (err) => {
				console.error('Erro no stream:', err);
				if (!res.headersSent) {
					res.status(500).end('Erro ao ler o arquivo');
				}
			});

			await fileStream.pipe(res);
		}

		return {} as ReturnGetArchiveType;
	}
}

export const getDocument = new GetDocument();
