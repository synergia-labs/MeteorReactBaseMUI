import { enumStorageConfig } from './config.enum';

function getName(name: string) {
	return `${enumStorageConfig.apiName}.${name}`;
}

export const enumStorageMethods = {
	getDocument: getName('getDocument'),
	getAudio: getName('getAudio'),
	getVideo: getName('getVideo'),
	getImage: getName('getImage'),

	uploadDocument: getName('uploadDocument'),
	uploadAudio: getName('uploadAudio'),
	uploadVideo: getName('uploadVideo'),
	uploadImage: getName('uploadImage'),

	deleteDocument: getName('deleteDocument'),
	deleteAudio: getName('deleteAudio'),
	deleteVideo: getName('deleteVideo'),
	deleteImage: getName('deleteImage')
};
