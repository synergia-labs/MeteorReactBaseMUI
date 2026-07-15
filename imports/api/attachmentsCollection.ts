import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Random } from 'meteor/random';

export const MAX_UPLOAD_BYTES = Number(process.env.MAX_UPLOAD_BYTES || 15 * 1024 * 1024);
const ALLOWED_UPLOADS: Record<string, ReadonlySet<string>> = {
	png: new Set(['image/png']),
	jpg: new Set(['image/jpeg']),
	jpeg: new Set(['image/jpeg']),
	gif: new Set(['image/gif']),
	bmp: new Set(['image/bmp']),
	webp: new Set(['image/webp']),
	mp3: new Set(['audio/mpeg']),
	m4a: new Set(['audio/mp4', 'audio/x-m4a']),
	aac: new Set(['audio/aac']),
	wav: new Set(['audio/wav', 'audio/x-wav']),
	ogg: new Set(['audio/ogg']),
	webm: new Set(['audio/webm']),
	pdf: new Set(['application/pdf']),
	txt: new Set(['text/plain']),
	csv: new Set(['text/csv', 'application/csv', 'text/plain']),
	xls: new Set(['application/vnd.ms-excel']),
	xlsx: new Set(['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']),
	doc: new Set(['application/msword']),
	docx: new Set(['application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
	odt: new Set(['application/vnd.oasis.opendocument.text']),
	ods: new Set(['application/vnd.oasis.opendocument.spreadsheet'])
};

const attachmentMediaToken = Meteor.isServer ? process.env.MEDIA_ACCESS_TOKEN || Random.id(43) : '';
const attachmentMediaTokenEnabled = process.env.DISABLE_MEDIA_TOKEN !== 'true';

const normalizeMimeType = (mimeType: unknown) =>
	String(mimeType || '')
		.split(';', 1)[0]
		.trim()
		.toLowerCase();

export const isAllowedAttachment = ({
	name,
	extension,
	mimeType,
	size
}: {
	name?: string;
	extension?: string;
	mimeType: string;
	size: number;
}) => {
	const normalizedExtension = String(extension || name?.split('.').pop() || '').toLowerCase();
	const normalizedMimeType = normalizeMimeType(mimeType);
	return (
		Number.isInteger(size) &&
		size >= 0 &&
		size <= MAX_UPLOAD_BYTES &&
		Boolean(ALLOWED_UPLOADS[normalizedExtension]?.has(normalizedMimeType))
	);
};

let uploadPaths: string | null = null;
if (Meteor.isServer) {
	const fs = require('fs');
	const defaultUploadPath = `${process.cwd()}/uploads/meteorUploads`;

	uploadPaths = process.env.UPLOADS_DIR || defaultUploadPath;

	if (!fs.existsSync(uploadPaths)) {
		fs.mkdirSync(uploadPaths, { recursive: true });
	}
}

class AttachmentsCollection {
	attachments: FilesCollection;

	constructor() {
		/**
		 * Don't forget to change the path to the server path
		 */
		// const storagePath = path: '/home/servicedesk/DEPLOY/LINIO_SERVICEDESK_PRODUCAO/bundle/uploads'
		this.attachments = new FilesCollection({
			collectionName: 'Attachments',
			allowClientCode: false,
			// Mudar a cada versão
			// ToDo Colocar em uma variável de ambiente
			storagePath: uploadPaths,
			onBeforeUpload(file: any) {
				const ownerMatches = Boolean(this.userId && file.meta?.userId === this.userId);
				const allowed = isAllowedAttachment({
					name: file.name,
					extension: file.extension,
					mimeType: file.type,
					size: file.size
				});

				if (ownerMatches && file.size > 0 && allowed) return true;
				return 'Arquivo não autorizado, tipo inválido ou tamanho acima do limite.';
			},
			protected(file: any) {
				const token = (this.params as any)?.query?.token;
				const ownerMatches = Boolean(this.userId && file?.meta?.userId === this.userId);
				const tokenMatches = Boolean(
					attachmentMediaTokenEnabled && attachmentMediaToken && token === attachmentMediaToken
				);
				return !attachmentMediaTokenEnabled || ownerMatches || tokenMatches;
			}
		});
		this.applyPublication();
		this.serverGetFileFileByDocId('MapaCalorConfig');
	}

	applyPublication = () => {
		const self = this;
		if (Meteor.isServer) {
			Meteor.methods({
				async RemoveFile(id) {
					check(id, String);
					if (!this.userId) throw new Meteor.Error('not-authorized', 'Autenticação obrigatória.');
					const file = await self.attachments.collection.findOneAsync({ _id: id });
					if (!file) return false;
					if (file.meta?.userId !== this.userId)
						throw new Meteor.Error('not-authorized', 'Arquivo fora do seu escopo.');
					await self.attachments.removeAsync(id);
					return true;
				}
			});

			Meteor.publish('files-attachments', function (filter) {
				check(filter, Match.ObjectIncluding({ 'meta.docId': String }));
				if (!this.userId) return this.ready();
				return self.attachments.collection.find(
					{ 'meta.docId': filter['meta.docId'], 'meta.userId': this.userId },
					{ fields: { name: 1, size: 1, type: 1, extension: 1, meta: 1, versions: 1 } }
				);
			});
		}
	};

	find = (filter: any, options: any = {}) => this.attachments.collection.find(filter, options);

	getAttachmentDoc = (doc: any) => ({
		_id: doc._id,
		size: doc.size,
		type: 'application/octet-stream',
		name: doc.name,
		ext: 'csv',
		extension: 'csv',
		extensionWithDot: '.csv',
		mime: '',
		'mime-type': '',
		userId: doc.meta?.userId || null,
		path: doc.path,
		uploadedAt: doc.uploadedAt || new Date(),
		meta: doc.meta || {},
		versions: {
			original: {
				path: doc.path,
				size: doc.size,
				type: '',
				extension: 'csv'
			}
		},
		_downloadRoute: '/cdn/storage',
		_collectionName: 'Attachments',
		isVideo: false,
		isAudio: false,
		isImage: false,
		isText: false,
		isJSON: false,
		isPDF: false,
		_storagePath: '/meteorUploads',
		public: false
	});

	getFileLink = (doc: any) => {
		if (!doc?._id || !doc?.name) return null;
		const route = doc._downloadRoute || '/cdn/storage';
		const collection = doc._collectionName || 'Attachments';
		const tokenQuery = attachmentMediaTokenEnabled ? `?token=${encodeURIComponent(attachmentMediaToken)}` : '';
		return `${Meteor.absoluteUrl()}${route.replace(/^\//, '')}/${collection}/${doc._id}/original/${encodeURIComponent(doc.name)}${tokenQuery}`;
	};

	/** Move um upload em blocos já validado para o storage persistente. */
	serverSaveFileFromPath = async ({
		id,
		tempPath,
		name,
		mimeType,
		size,
		meta
	}: {
		id: string;
		tempPath: string;
		name: string;
		mimeType: string;
		size: number;
		meta: Record<string, any>;
	}) => {
		if (!Meteor.isServer || !uploadPaths) return null;
		const fs = require('fs').promises;
		const path = require('path');
		const safeName = path.basename(name).replace(/[^A-Za-z0-9._-]/g, '_');
		const extension = String(safeName.split('.').pop() || '').toLowerCase();
		const type = normalizeMimeType(mimeType);
		if (!safeName || !isAllowedAttachment({ name: safeName, mimeType: type, size })) {
			throw new Meteor.Error('invalid-upload', 'Tipo, extensão ou tamanho do arquivo não permitido.');
		}

		const finalPath = path.join(uploadPaths, `${id}-${safeName}`);
		try {
			try {
				await fs.rename(tempPath, finalPath);
			} catch (error: any) {
				if (error?.code !== 'EXDEV') throw error;
				await fs.copyFile(tempPath, finalPath);
				await fs.unlink(tempPath);
			}
			const stat = await fs.stat(finalPath);
			if (size !== stat.size) {
				throw new Meteor.Error('upload-size-mismatch', 'O tamanho final do arquivo não confere.');
			}
			const fileDoc = {
				_id: id,
				name: safeName,
				size: stat.size,
				type,
				extension,
				extensionWithDot: extension ? `.${extension}` : '',
				uploadedAt: new Date(),
				path: finalPath,
				meta: meta || {},
				versions: { original: { path: finalPath, size: stat.size, type, extension } },
				_downloadRoute: '/cdn/storage',
				_collectionName: 'Attachments',
				isVideo: type.startsWith('video/'),
				isAudio: type.startsWith('audio/'),
				isImage: type.startsWith('image/'),
				isText: type.startsWith('text/'),
				isJSON: type === 'application/json',
				isPDF: type === 'application/pdf',
				_storagePath: uploadPaths,
				public: false,
				userId: meta?.userId || null
			};
			await this.serverInsert(fileDoc);
			return { ...fileDoc, url: this.getFileLink(fileDoc) };
		} catch (error) {
			await fs.unlink(finalPath).catch(() => undefined);
			throw error;
		}
	};

	serverInsert = async (doc: any) => {
		return this.attachments.collection.insertAsync(doc);
	};

	serverGetFileFileByDocId = async (id: string) => {
		const docFile = await this.attachments.collection.findOneAsync(
			{ 'meta.docId': id },
			{ sort: { uploadedAt: -1, _id: -1 } }
		);
		return docFile?.path || null;
	};

	serverSaveCSVFile = async (file: string | Buffer, fileName?: string) => {
		if (Meteor.isServer) {
			const fileId = Random.id();
			const nameFile = `${fileName ? fileName : fileId}.csv`;
			const fs = require('fs').promises;
			await fs.writeFile(`${uploadPaths}/${nameFile}`, file);
			const fileStat = await fs.stat(`${uploadPaths}/${nameFile}`);
			const fileData = {
				_id: fileId,
				name: nameFile,
				size: fileStat.size,
				path: `${uploadPaths}/${nameFile}`
			};
			await this.serverInsert(this.getAttachmentDoc(fileData));
			return `${Meteor.absoluteUrl()}cdn/storage/Attachments/${fileId}/original/${nameFile}`;
		}
	};

	findOne = (filter: any) => this.attachments.findOne(filter);

	getCollection = () => this.attachments;
}

export const attachmentsCollection = new AttachmentsCollection();
