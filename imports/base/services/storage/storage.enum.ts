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
	getVideo: getName('getVideo')
};

export enum StorageEnum {
	getImage = ``
}
