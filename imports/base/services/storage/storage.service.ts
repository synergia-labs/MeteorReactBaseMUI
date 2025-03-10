import { Meteor } from 'meteor/meteor';
import ServerBase, { MethodType } from '../../server/server.base';
import { FilesCollection } from 'meteor/ostrio:files';
import { getFileUrlSch, GetFileUrlType } from './types/getFileUrl.type';
import { StorageConfigEnum } from './common/storage.enum';
import { FileTypeEnum } from './types/file.type';
import { getFile } from './methods/getFile';

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
		this.addRestEndpoint(
			'getStorageFile',
			getFile.execute.bind(getFile) as MethodType<any, any>,
			'get',
			`${StorageConfigEnum.baseUrl}/${FileTypeEnum.Enum.file}`
		);
	}

	static getUrl(params: GetFileUrlType): string | null {
		getFileUrlSch.parse(params);
		const { _id, type, resolution } = params;

		let url = `${StorageConfigEnum.baseUrl}/${type}?_id=${_id}`;

		const access = Meteor.userId();

		if (resolution) url += `&resolution=${resolution}`;
		if (access) url += `&access=${access}`;

		return url;
	}
}

const storageService = new StorageService();
export default storageService;
