import { Meteor } from 'meteor/meteor';
import ServerBase from '../../server/server.base';
import { getFileUrlSch, GetFileUrlType } from './common/types/getFileUrl.type';
import { enumFileType } from './common/types/file.type';
import { enumStorageConfig } from './common/enums/config.enum';
import { MethodType } from '../../types/method';
import { uploadImage } from './methods/uploadImage';
import MethodBase from '/imports/base/server/methods/method.base';
import { enumEndpointType } from '../../types/serverParams';
import { getImage } from './methods/getImage';
import { generateFileCollection } from './utils/fileCollection';
import { deleteImage } from './methods/deleteImage';
import { uploadAudio } from './methods/uploadAudio';
import { deleteAudio } from './methods/deleteAudio';
import { getAudio } from './methods/getAudio';
import { getVideo } from './methods/getVideo';
import { uploadVideo } from './methods/uploadVideo';
import { deleteVideo } from './methods/deleteVideo';
import { getDocument } from './methods/getDocument';
import { uploadDocument } from './methods/uploadDocument';
import { deleteDocument } from './methods/deleteDocument';

const _methodInstances: Array<MethodBase<any, any, any>> = [
	uploadImage,
	uploadAudio,
	uploadVideo,
	uploadDocument,

	deleteImage,
	deleteAudio,
	deleteVideo,
	deleteDocument
] as const;

export class StorageServer extends ServerBase {
	static videoCollection = generateFileCollection({
		collectionName: enumFileType.enum.VIDEO,
		limitSize: 1024 * 1024 * 100,
		allowedExtensions: ['mp4', 'webm', 'ogg', 'gif']
	});

	static documentCollection = generateFileCollection({
		collectionName: enumFileType.enum.DOCUMENT,
		limitSize: 1024 * 1024 * 10,
		allowedExtensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
	});

	static audioCollection = generateFileCollection({
		collectionName: enumFileType.enum.AUDIO,
		limitSize: 1024 * 1024 * 10,
		allowedExtensions: ['mp3', 'wav', 'ogg']
	});

	static imageCollection = generateFileCollection({
		collectionName: enumFileType.enum.IMAGE,
		limitSize: 1024 * 1024 * 5,
		allowedExtensions: ['png', 'jpg', 'jpeg']
	});

	constructor() {
		super(enumStorageConfig.apiName);
		this.registerMethods(_methodInstances, this);

		this.addRestEndpoints([
			[
				enumEndpointType.enum.GET,
				getImage.execute.bind(getImage) as MethodType<typeof getImage>,
				enumFileType.enum.IMAGE
			],
			[
				enumEndpointType.enum.GET,
				getAudio.execute.bind(getAudio) as MethodType<typeof getAudio>,
				enumFileType.enum.AUDIO
			],
			[
				enumEndpointType.enum.GET,
				getVideo.execute.bind(getVideo) as MethodType<typeof getVideo>,
				enumFileType.enum.VIDEO
			],
			[
				enumEndpointType.enum.GET,
				getDocument.execute.bind(getDocument) as MethodType<typeof getDocument>,
				enumFileType.enum.DOCUMENT
			]
		]);
	}

	public getUrl(params: GetFileUrlType): string {
		params = getFileUrlSch.parse(params);
		const { _id, type, resolution, isDownload, withPreview } = params;

		let url = this.getMainUrl(type);
		url += `?_id=${_id}`;

		const access = Meteor.userId();
		if (resolution) url += `&resolution=${resolution}`;
		if (access) url += `&access=${access}`;
		if (isDownload) url += `&dl=1`;
		if (withPreview) url += `&preview=1`;

		return url;
	}
}

const storageServer = new StorageServer();
export default storageServer;
