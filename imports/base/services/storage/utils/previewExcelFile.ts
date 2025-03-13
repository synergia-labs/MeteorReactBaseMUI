import { IArchive } from '../common/types/archive.type';
import { previewDefaultFile } from './previewDefaultFile';

export async function previewExcel(file: IArchive, res: any, req: any) {
	// Implementação básica para planilhas Excel
	previewDefaultFile(file, res, req);
}
