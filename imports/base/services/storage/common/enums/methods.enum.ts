import { enumStorageConfig } from './config.enum';

function getName(name: string) {
	return `${enumStorageConfig.apiName}.${name}`;
}

export const enumStorageMethods = {
	getFile: getName('getFile'),
	getAudio: getName('getAudio'),
	getVideo: getName('getVideo'),
	getImage: getName('getImage'),

	uploadFile: getName('uploadFile'),
	uploadAudio: getName('uploadAudio'),
	uploadVideo: getName('uploadVideo'),
	uploadImage: getName('uploadImage'),

	removeFile: getName('removeFile'),
	removeAudio: getName('removeAudio'),
	removeVideo: getName('removeVideo'),
	removeImage: getName('removeImage')
};
