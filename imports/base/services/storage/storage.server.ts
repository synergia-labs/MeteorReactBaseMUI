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

/**
 * Lista de métodos disponíveis para manipulação de arquivos no servidor de armazenamento.
 */
const _methodInstances: Array<MethodBase<any, any, any>> = [
	uploadImage,
	uploadAudio,
	uploadVideo,
	uploadDocument,

	deleteImage,
	deleteAudio,
	deleteVideo,
	deleteDocument,

	getImage,
	getAudio,
	getVideo,
	getDocument
] as const;

/**
 * Classe responsável por gerenciar o armazenamento de arquivos no servidor.
 * Suporta imagens, vídeos, áudios e documentos.
 */
export class StorageServer extends ServerBase {
	/**
	 * Coleção para armazenar vídeos.
	 * Permite arquivos `.mp4`, `.webm`, `.ogg` e `.gif` com limite de 100MB.
	 */
	private videoCollection = generateFileCollection({
		collectionName: enumFileType.enum.VIDEO,
		limitSize: 1024 * 1024 * 100, // 100MB
		allowedExtensions: ['mp4', 'webm', 'ogg', 'gif']
	});

	/**
	 * Coleção para armazenar documentos.
	 * Permite arquivos `.pdf`, `.doc`, `.xls`, `.ppt` e variantes com limite de 10MB.
	 */
	private documentCollection = generateFileCollection({
		collectionName: enumFileType.enum.DOCUMENT,
		limitSize: 1024 * 1024 * 10, // 10MB
		allowedExtensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']
	});

	/**
	 * Coleção para armazenar áudios.
	 * Permite arquivos `.mp3`, `.wav` e `.ogg` com limite de 10MB.
	 */
	private audioCollection = generateFileCollection({
		collectionName: enumFileType.enum.AUDIO,
		limitSize: 1024 * 1024 * 10, // 10MB
		allowedExtensions: ['mp3', 'wav', 'ogg']
	});

	/**
	 * Coleção para armazenar imagens.
	 * Permite arquivos `.png`, `.jpg`, `.jpeg` com limite de 5MB.
	 */
	private imageCollection = generateFileCollection({
		collectionName: enumFileType.enum.IMAGE,
		limitSize: 1024 * 1024 * 5, // 5MB
		allowedExtensions: ['png', 'jpg', 'jpeg']
	});

	/**
	 * Construtor da classe `StorageServer`.
	 * Inicializa o servidor de armazenamento e registra os métodos disponíveis.
	 */
	constructor() {
		super(enumStorageConfig.apiName);
		this.registerMethods(_methodInstances, this);

		// Registra os endpoints REST para obtenção de arquivos.
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

	getVideoCollection = () => this.videoCollection;
	getDocumentCollection = () => this.documentCollection;
	getAudioCollection = () => this.audioCollection;
	getImageCollection = () => this.imageCollection;

	/**
	 * Gera a URL do arquivo com base nos parâmetros fornecidos.
	 *
	 * @param params - Objeto contendo as configurações para a geração da URL.
	 * @param params._id - ID único do arquivo.
	 * @param params.type - Tipo do arquivo (imagem, vídeo, áudio, documento).
	 * @param params.resolution - Resolução do arquivo (opcional).
	 * @param params.isDownload - Indica se o arquivo deve ser baixado (opcional).
	 * @param params.withPreview - Define se a URL incluirá uma pré-visualização (opcional).
	 *
	 * @returns A URL do arquivo como string.
	 */
	public getUrl(params: GetFileUrlType): string {
		// Valida os parâmetros usando o esquema Zod.
		params = getFileUrlSch.parse(params);
		const { _id, type, resolution, isDownload, withPreview } = params;

		// Constrói a URL base do arquivo.
		let url = this.getMainUrl(type);
		url += `?_id=${_id}`;

		// Adiciona parâmetros opcionais.
		const access = Meteor.userId();
		if (resolution) url += `&resolution=${resolution}`;
		if (access) url += `&access=${access}`;
		if (isDownload) url += `&dl=1`;
		if (withPreview) url += `&preview=1`;

		return url;
	}
}

/** Instância única do servidor de armazenamento. */
const storageServer = new StorageServer();
export default storageServer;
