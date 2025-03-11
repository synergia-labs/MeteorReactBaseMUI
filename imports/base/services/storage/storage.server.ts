import { Meteor } from 'meteor/meteor';
import ServerBase from '../../server/server.base';
import { getFileUrlSch, GetFileUrlType } from './common/types/getFileUrl.type';
import { FileTypeEnum } from './common/types/file.type';
import { enumStorageConfig } from './common/enums/config.enum';
import { MethodType } from '../../types/method';
import { uploadImage } from './methods/uploadImage';
import MethodBase from '/imports/base/server/methods/method.base';
import { EndpointTypeEnum } from '../../types/serverParams';
import { getImage } from './methods/getImage';
import { generateFileCollection } from './utils/fileCollection';
import { deleteImage } from './methods/deleteImage';

const _methodInstances: Array<MethodBase<any, any, any>> = [uploadImage, deleteImage] as const;

export class StorageServer extends ServerBase {
	static videoCollection = generateFileCollection({
		collectionName: FileTypeEnum.enum.VIDEO,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.enum.VIDEO}`,
		limitSize: 1024 * 1024 * 100,
		allowedExtensions: ['mp4', 'webm', 'ogg', 'gif']
	});

	static documentCollection = generateFileCollection({
		collectionName: FileTypeEnum.enum.DOCUMENT,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.enum.DOCUMENT}`,
		limitSize: 1024 * 1024 * 10,
		allowedExtensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
	});

	static audioCollection = generateFileCollection({
		collectionName: FileTypeEnum.enum.AUDIO,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.enum.AUDIO}`,
		limitSize: 1024 * 1024 * 10,
		allowedExtensions: ['mp3', 'wav', 'ogg']
	});

	static imageCollection = generateFileCollection({
		collectionName: FileTypeEnum.enum.IMAGE,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.enum.IMAGE}`,
		limitSize: 1024 * 1024 * 5,
		allowedExtensions: ['png', 'jpg', 'jpeg']
	});

	constructor() {
		super(enumStorageConfig.apiName);
		this.registerMethods(_methodInstances, this);

		this.addRestEndpoints([
			[
				EndpointTypeEnum.enum.GET,
				getImage.execute.bind(getImage) as MethodType<typeof getImage>,
				FileTypeEnum.enum.IMAGE
			]
		]);
	}

	protected getUrl(params: GetFileUrlType): string | null {
		getFileUrlSch.parse(params);
		const { _id, type, resolution, isDownload } = params;

		let url = this.getMainUrl(type);
		url += `?_id=${_id}`;

		const access = Meteor.userId();
		if (resolution) url += `&resolution=${resolution}`;
		if (access) url += `&access=${access}`;
		if (isDownload) url += `&dl=1`;

		return url;
	}
}

const storageService = new StorageServer();
export default storageService;
