import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Random } from 'meteor/random';

const MAX_UPLOAD_BYTES = Number(process.env.MAX_UPLOAD_BYTES || 15 * 1024 * 1024);
const ALLOWED_UPLOADS: Record<string, ReadonlySet<string>> = {
	png: new Set(['image/png']),
	jpg: new Set(['image/jpeg']),
	jpeg: new Set(['image/jpeg']),
	gif: new Set(['image/gif']),
	bmp: new Set(['image/bmp']),
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
				const extension = String(file.extension || '').toLowerCase();
				const mime = String(file.type || '').toLowerCase();
				const ownerMatches = Boolean(this.userId && file.meta?.userId === this.userId);
				const allowedMime = ALLOWED_UPLOADS[extension]?.has(mime);

				if (ownerMatches && file.size > 0 && file.size <= MAX_UPLOAD_BYTES && allowedMime) return true;
				return 'Arquivo não autorizado, tipo inválido ou tamanho acima do limite.';
			},
			protected(file: any) {
				return Boolean(this.userId && file?.meta?.userId === this.userId);
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

	find = (filter: any) => this.attachments.collection.find(filter);

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
		userId: 'B2WZtLcLjeAoadsML',
		path: doc.path,
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

	serverInsert = async (doc: any) => {
		return this.attachments.collection.insertAsync(doc);
	};

	serverGetFileFileByDocId = async (id: string) => {
		const docFile = await this.find({ 'meta.docId': id }).fetchAsync();
		return docFile[0]?.path || null;
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
