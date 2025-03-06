import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import { ServerBase } from './server.base';
import { WebApp } from 'meteor/webapp';
import fs from 'fs';
import path from 'path';

export class StorageService extends ServerBase {
	private static apiBaseURL = '/api/storage';
	private static videoCollection = new FilesCollection({
		collectionName: 'Videos',
		allowClientCode: false,
		storagePath: '/uploads/videos'
	});

	private static audioCollection = new FilesCollection({
		collectionName: 'Audios',
		allowClientCode: false,
		storagePath: '/uploads/audios'
	});

	private static imageCollection = new FilesCollection({
		collectionName: 'Images',
		allowClientCode: false,
		storagePath: '/uploads/images'
	});

	private static fileCollection = new FilesCollection({
		collectionName: 'Files',
		allowClientCode: false,
		storagePath: '/uploads/files'
	});

	constructor() {
		WebApp.connectHandlers.use('/api/v1/storage/file', (req, res) => {
			const _id = req.url.split('/').pop();
			if (!_id) {
				res.writeHead(400, { 'Content-Type': 'text/plain' });
				res.end('Missing file ID');
				return;
			}

			// Procura o arquivo em qualquer uma das coleções
			const file =
				StorageService.videoCollection.findOne({ _id }) ||
				StorageService.audioCollection.findOne({ _id }) ||
				StorageService.imageCollection.findOne({ _id }) ||
				StorageService.fileCollection.findOne({ _id });

			if (!file) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('File not found');
				return;
			}

			const filePath = path.join(process.cwd(), file.path);

			if (!fs.existsSync(filePath)) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('File not found on server');
				return;
			}

			res.writeHead(200, { 'Content-Type': file.type });
			const readStream = fs.createReadStream(filePath);
			readStream.pipe(res);
		});
	}

	// 🔹 Upload de Vídeo
	static uploadVideo(video: File): string {
		return StorageService.videoCollection.insert({ file: video })._id;
	}

	// 🔹 Obter Vídeo por ID e Resolução (Ajuste necessário para suportar múltiplas resoluções)
	static getVideo(_id: string, resolution: string) {
		return StorageService.videoCollection.findOne({ _id });
	}

	// 🔹 Upload de Áudio
	static uploadAudio(audio: File): string {
		return StorageService.audioCollection.insert({ file: audio })._id;
	}

	// 🔹 Obter Áudio por ID e Qualidade
	static getAudio(_id: string, quality: string) {
		return StorageService.audioCollection.findOne({ _id });
	}

	// 🔹 Upload de Imagem
	static uploadImage(image: File): string {
		return StorageService.imageCollection.insert({ file: image })._id;
	}

	// 🔹 Obter Imagem por ID, Largura e Altura (Redimensionamento opcional)
	static getImage(_id: string, width?: number, height?: number) {
		return StorageService.imageCollection.findOne({ _id });
	}

	// 🔹 Upload de Arquivo
	static uploadFile(file: File): string {
		return StorageService.fileCollection.insert({ file })._id;
	}

	// 🔹 Obter Arquivo por ID
	static getFile(_id: string) {
		return StorageService.fileCollection.findOne({ _id });
	}
}
