export enum StorageConfigEnum {
	defaultDirectory = '../uploads',
	baseUrl = '/storage/getFile',
	apiName = 'StorageService'
}

function getName(name: string) {
	return `${StorageConfigEnum.apiName}.${name}`;
}

export const StorageMethods = {
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
