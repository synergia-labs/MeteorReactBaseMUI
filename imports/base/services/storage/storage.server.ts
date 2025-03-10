import { Meteor } from 'meteor/meteor';
import ServerBase from '../../server/server.base';
import { FilesCollection } from 'meteor/ostrio:files';
import { getFileUrlSch, GetFileUrlType } from './common/types/getFileUrl.type';
import { FileTypeEnum } from './common/types/file.type';
import { getFile } from './methods/getFile';
import { enumStorageConfig } from './common/enums/config.enum';
import { MethodType } from '../../types/method';
import { uploadImage } from './methods/uploadImage';
import MethodBase from '/imports/base/server/methods/method.base';

const _methodInstances: Array<MethodBase<any, any, any>> = [uploadImage] as const;

export class StorageServer extends ServerBase {
	static videoCollection = new FilesCollection({
		collectionName: FileTypeEnum.Enum.video,
		allowClientCode: false,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.Enum.video}`
	});

	static audioCollection = new FilesCollection({
		collectionName: FileTypeEnum.Enum.audio,
		allowClientCode: false,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.Enum.audio}`
	});

	static imageCollection = new FilesCollection({
		collectionName: FileTypeEnum.Enum.image,
		allowClientCode: false,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.Enum.image}`
	});

	static fileCollection = new FilesCollection({
		collectionName: FileTypeEnum.Enum.file,
		allowClientCode: false,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.Enum.file}`
	});

	constructor() {
		super(enumStorageConfig.apiName);
		this.registerMethods(_methodInstances, this);

		this.addRestEndpoint(
			'getStorageFile',
			getFile.execute.bind(getFile) as MethodType<typeof getFile>,
			'get',
			`${enumStorageConfig.baseUrl}/${FileTypeEnum.Enum.file}`
		);

		// this.addRestEndpoint(
		// 	'getStorageImage',
		// 	getImage.execute.bind(getFile) as MethodType<typeof getImage>,
		// 	'get',
		// 	`${enumStorageConfig.baseUrl}/${FileTypeEnum.Enum.image}`
		// );
	}

	static getUrl(params: GetFileUrlType): string | null {
		getFileUrlSch.parse(params);
		const { _id, type, resolution } = params;

		let url = `${enumStorageConfig.baseUrl}/${type}?_id=${_id}`;

		const access = Meteor.userId();

		if (resolution) url += `&resolution=${resolution}`;
		if (access) url += `&access=${access}`;

		return url;
	}
}

const storageService = new StorageServer();
export default storageService;
