import { Meteor } from 'meteor/meteor';
import ServerBase from '../../server/server.base';
import { FilesCollection } from 'meteor/ostrio:files';
import { getFileUrlSch, GetFileUrlType } from './types/getFileUrl.type';
import { StorageConfigEnum } from './storage.enum';
import { FileTypeEnum } from './types/file.type';

export class StorageService extends ServerBase {
	static videoCollection = new FilesCollection({
		collectionName: FileTypeEnum.Enum.video,
		allowClientCode: false,
		storagePath: `${StorageConfigEnum.defaultDirectory}/${FileTypeEnum.Enum.video}`
	});

	static audioCollection = new FilesCollection({
		collectionName: FileTypeEnum.Enum.audio,
		allowClientCode: false,
		storagePath: `${StorageConfigEnum.defaultDirectory}/${FileTypeEnum.Enum.audio}`
	});

	static imageCollection = new FilesCollection({
		collectionName: FileTypeEnum.Enum.image,
		allowClientCode: false,
		storagePath: `${StorageConfigEnum.defaultDirectory}/${FileTypeEnum.Enum.image}`
	});

	static fileCollection = new FilesCollection({
		collectionName: FileTypeEnum.Enum.file,
		allowClientCode: false,
		storagePath: `${StorageConfigEnum.defaultDirectory}/${FileTypeEnum.Enum.file}`
	});

	constructor() {
		super(StorageConfigEnum.apiName);
		this.addRestEndpoint('getStorageFile', () => {}, 'get', StorageConfigEnum.baseUrl);
	}

	static getFileUrl(params: GetFileUrlType): string | null {
		getFileUrlSch.parse(params);
		const { _id, type, resolution } = params;

		let url = `${StorageConfigEnum.baseUrl}/${type}?_id=${_id}`;
		if (resolution) {
			url += `&resolution=${resolution}`;
		}
		return url;
	}
}
