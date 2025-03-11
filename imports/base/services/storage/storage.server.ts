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
import { EndpointTypeEnum } from '../../types/serverParams';
import { getImage } from './methods/getImage';

const _methodInstances: Array<MethodBase<any, any, any>> = [uploadImage] as const;

export class StorageServer extends ServerBase {
	static videoCollection = new FilesCollection({
		collectionName: FileTypeEnum.enum.VIDEO,
		allowClientCode: false,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.enum.VIDEO}`
	});

	static audioCollection = new FilesCollection({
		collectionName: FileTypeEnum.enum.AUDIO,
		allowClientCode: false,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.enum.AUDIO}`
	});

	static imageCollection = new FilesCollection({
		collectionName: FileTypeEnum.enum.IMAGE,
		allowClientCode: false,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.enum.IMAGE}`
	});

	static fileCollection = new FilesCollection({
		collectionName: FileTypeEnum.enum.FILE,
		allowClientCode: false,
		storagePath: `${enumStorageConfig.defaultDirectory}/${FileTypeEnum.enum.FILE}`
	});

	constructor() {
		super(enumStorageConfig.apiName);
		this.registerMethods(_methodInstances, this);

		this.addRestEndpoints([
			[EndpointTypeEnum.enum.GET, getFile.execute.bind(getFile) as MethodType<typeof getFile>, FileTypeEnum.enum.FILE],
			[EndpointTypeEnum.enum.GET, getImage.execute.bind(getFile) as MethodType<typeof getFile>, FileTypeEnum.enum.IMAGE]
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
