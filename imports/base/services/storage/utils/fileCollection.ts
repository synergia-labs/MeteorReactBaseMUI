import { FilesCollection } from 'meteor/ostrio:files';
import { enumStorageConfig } from '../common/enums/config.enum';

interface IGenerateFileCollection {
	collectionName: string;
	limitSize?: number;
	allowedExtensions?: string[];
}

export function generateFileCollection({ collectionName, limitSize, allowedExtensions }: IGenerateFileCollection) {
	return new FilesCollection({
		collectionName,
		allowClientCode: false,
		storagePath: `${enumStorageConfig.defaultDirectory}/${collectionName}`,
		protected: true,
		onBeforeUpload(archive: IArchive) {
			if (limitSize && archive.size > limitSize) {
				return `O tamanho máximo permitido é de ${limitSize / 1024 / 1024}MB.`;
			}

			if (allowedExtensions && !allowedExtensions.includes(archive.extension)) {
				return `Apenas arquivos com as seguintes extensões são permitidos: ${allowedExtensions.join(', ')}`;
			}

			return true;
		},
		onBeforeRemove() {
			return false;
		}
	});
}
