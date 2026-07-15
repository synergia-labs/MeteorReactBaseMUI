// region Imports
import { Recurso } from '../config/recursos';
import { exampleSch, IExample } from './exampleSch';
import { userprofileServerApi } from '../../../modules/userprofile/api/userProfileServerApi';
import { ProductServerBase } from '../../../api/productServerBase';
import { getMediaAccessQuery } from '../../../api/serverBase';
import { attachmentsCollection, isAllowedAttachment, MAX_UPLOAD_BYTES } from '../../../api/attachmentsCollection';
import { segurancaApi } from '../../../security/api/segurancaApi';
import { IContext } from '../../../typings/IContext';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// endregion

type AssetKind = 'image' | 'audio' | 'attachment';

interface IUploadAssetChunk {
	assetId: string;
	exampleId: string;
	name: string;
	mimeType: string;
	kind: AssetKind;
	size: number;
	checksum: string;
	offset: number;
	data: string;
	isLast: boolean;
}

class ExampleServerApi extends ProductServerBase<IExample> {
	readonly tombstones = new Mongo.Collection<{ _id?: string; documentId: string; deletedAt: Date }>(
		'example_sync_tombstones'
	);

	constructor() {
		super('example', exampleSch, {
			resources: Recurso
			// saveImageToDisk: true,
		});

		this.addTransformedPublication(
			'exampleList',
			(filter = {}) => {
				return this.defaultListCollectionPublication(filter, {
					projection: { title: 1, type: 1, typeMulti: 1, createdat: 1 }
				});
			},
			async (doc: IExample & { nomeUsuario: string }) => {
				await userprofileServerApi.getCollectionInstance().findOneAsync({ _id: doc.createdby });
				return { ...doc };
			}
		);

		this.addPublication('exampleDetail', (filter = {}) => {
			return this.defaultDetailCollectionPublication(filter, {
				projection: {
					contacts: 1,
					title: 1,
					description: 1,
					type: 1,
					typeMulti: 1,
					date: 1,
					files: 1,
					images: 1,
					audios: 1,
					chip: 1,
					statusRadio: 1,
					statusToggle: 1,
					slider: 1,
					check: 1,
					address: 1,
					image: 1,
					audio: 1
				}
			});
		});

		this.registerMethod('mobilePull', this.mobilePull.bind(this));
		this.registerMethod('mobileAssetsPage', this.mobileAssetsPage.bind(this));
		this.registerMethod('mobileGet', this.mobileGet.bind(this));
		this.registerMethod('mobileUpsert', this.mobileUpsert.bind(this));
		this.registerMethod('uploadAssetChunk', this.uploadAssetChunk.bind(this));
		this.registerMethod('removeAsset', this.removeAsset.bind(this));
	}

	private assertCanView(context: IContext) {
		segurancaApi.validarAcessoRecursos(context.user, [Recurso.EXAMPLE_VIEW]);
	}

	private assetKind(fieldName: string, mimeType: string): AssetKind {
		if (fieldName === 'images' || mimeType.startsWith('image/')) return 'image';
		if (fieldName === 'audios' || mimeType.startsWith('audio/')) return 'audio';
		return 'attachment';
	}

	private serializeAsset(file: any) {
		const mimeType = file.type || file['mime-type'] || 'application/octet-stream';
		return {
			_id: file._id,
			exampleId: file.meta?.docId,
			kind: file.meta?.kind || this.assetKind(file.meta?.fieldName || '', mimeType),
			name: file.name,
			mimeType,
			size: file.size || 0,
			checksum: file.meta?.checksum,
			createdAt: file.uploadedAt,
			status: 'available',
			url: attachmentsCollection.getFileLink(file)
		};
	}

	private legacyAssets(doc: any) {
		const date = doc.lastupdate?.toISOString?.() || '1';
		const query = `${getMediaAccessQuery()}date=${encodeURIComponent(date)}`;
		const assets: any[] = [];
		if (doc.image && doc.image !== '-') {
			assets.push({
				_id: `legacy-image-${doc._id}`,
				exampleId: doc._id,
				kind: 'image',
				name: 'imagem.jpg',
				mimeType: 'image/jpeg',
				size: 0,
				createdAt: doc.createdat,
				status: 'available',
				url: `${Meteor.absoluteUrl()}img/example/image/${doc._id}?${query}`
			});
		}
		if (doc.audio && doc.audio !== '-') {
			assets.push({
				_id: `legacy-audio-${doc._id}`,
				exampleId: doc._id,
				kind: 'audio',
				name: 'audio.ogg',
				mimeType: 'audio/ogg',
				size: 0,
				createdAt: doc.createdat,
				status: 'available',
				url: `${Meteor.absoluteUrl()}audio/example/audio/${doc._id}?${query}`
			});
		}
		return assets;
	}

	async mobilePull(options: { since?: Date } = {}, context: IContext) {
		this.assertCanView(context);
		const cursor = new Date();
		const since = options.since ? new Date(options.since) : new Date(0);
		if (Number.isNaN(since.valueOf())) throw new Meteor.Error('invalid-cursor', 'Cursor de sincronização inválido.');

		const documentPage = await this.getCollectionInstance()
			.find({ lastupdate: { $gt: since, $lte: cursor } }, { limit: 501, sort: { lastupdate: 1, _id: 1 } })
			.fetchAsync();
		const deletedPage = await this.tombstones
			.find({ deletedAt: { $gt: since, $lte: cursor } }, { limit: 501, sort: { deletedAt: 1, _id: 1 } })
			.fetchAsync();
		const documentOverflow = documentPage.length > 500;
		const deletionOverflow = deletedPage.length > 500;
		const cutoffs = [
			documentOverflow ? new Date(documentPage[499].lastupdate).getTime() : null,
			deletionOverflow ? new Date(deletedPage[499].deletedAt).getTime() : null
		].filter((value): value is number => value !== null);
		const effectiveCursor = cutoffs.length ? new Date(Math.min(...cutoffs)) : cursor;
		const documents = documentPage
			.filter((doc: IExample) => new Date(doc.lastupdate!).getTime() <= effectiveCursor.getTime())
			.slice(0, 500);
		const deleted = deletedPage
			.filter((item) => new Date(item.deletedAt).getTime() <= effectiveCursor.getTime())
			.slice(0, 500);
		return {
			cursor: effectiveCursor,
			hasMore: documentOverflow || deletionOverflow,
			documents: documents.map((doc: IExample) => {
				const { image, audio, ...safe } = doc;
				return safe;
			}),
			deletedIds: deleted.map((item) => item.documentId)
		};
	}

	async mobileGet(input: { _id: string }, context: IContext) {
		this.assertCanView(context);
		if (!input?._id) throw new Meteor.Error('invalid-document', 'Identificador obrigatório.');
		const document = await this.getCollectionInstance().findOneAsync({ _id: input._id });
		if (!document) throw new Meteor.Error('document-not-found', 'Documento não encontrado.');
		const { image, audio, ...safe } = document;
		return safe;
	}

	async mobileAssetsPage(
		options: {
			fileCursor?: string;
			legacyCursor?: string;
			limit?: number;
			skipFiles?: boolean;
			skipLegacy?: boolean;
		} = {},
		context: IContext
	) {
		this.assertCanView(context);
		const limit = Math.min(Math.max(Number(options.limit) || 200, 1), 250);
		const documentIds = await this.getCollectionInstance().rawCollection().distinct('_id');
		const fileSelector: any = {
			'meta.docId': { $in: documentIds },
			$or: [{ 'meta.module': 'example' }, { 'meta.fieldName': { $in: ['files', 'images', 'audios'] } }]
		};
		if (options.fileCursor) fileSelector._id = { $gt: options.fileCursor };
		const filePage = options.skipFiles
			? []
			: await attachmentsCollection.find(fileSelector, { sort: { _id: 1 }, limit: limit + 1 }).fetchAsync();

		const legacySelector: any = {
			$or: [{ image: { $exists: true, $nin: ['', null, '-'] } }, { audio: { $exists: true, $nin: ['', null, '-'] } }]
		};
		if (options.legacyCursor) legacySelector._id = { $gt: options.legacyCursor };
		const legacyPage = options.skipLegacy
			? []
			: await this.getCollectionInstance()
					.find(legacySelector, {
						projection: { _id: 1, image: 1, audio: 1, lastupdate: 1, createdat: 1 },
						sort: { _id: 1 },
						limit: limit + 1
					})
					.fetchAsync();
		const files = filePage.slice(0, limit);
		const legacyDocuments = legacyPage.slice(0, limit);
		return {
			assets: [
				...files.map((file: any) => this.serializeAsset(file)),
				...legacyDocuments.flatMap((doc: any) => this.legacyAssets(doc))
			],
			fileCursor: files.length ? files[files.length - 1]._id : options.fileCursor || null,
			legacyCursor: legacyDocuments.length
				? legacyDocuments[legacyDocuments.length - 1]._id
				: options.legacyCursor || null,
			filesDone: Boolean(options.skipFiles) || filePage.length <= limit,
			legacyDone: Boolean(options.skipLegacy) || legacyPage.length <= limit
		};
	}

	async mobileUpsert(input: { document: IExample; baseVersion?: Date }, context: IContext) {
		if (!input?.document?._id) {
			throw new Meteor.Error('invalid-document', 'O documento precisa ter um identificador offline.');
		}
		const current = await this.getCollectionInstance().findOneAsync({ _id: input.document._id });
		if (!current) {
			await this.serverInsert(input.document, context);
			return await this.getCollectionInstance().findOneAsync({ _id: input.document._id });
		}

		const baseVersion = input.baseVersion ? new Date(input.baseVersion) : null;
		if (baseVersion && Number.isNaN(baseVersion.valueOf())) {
			throw new Meteor.Error('invalid-cursor', 'Versão-base inválida.');
		}
		if (!baseVersion) {
			const sameMutation = Object.entries(input.document)
				.filter(([key]) => !this.auditFields.includes(key))
				.every(([key, value]) => JSON.stringify(current[key]) === JSON.stringify(value));
			if (sameMutation) return current;
		}
		if (!baseVersion || !current.lastupdate || new Date(current.lastupdate).getTime() !== baseVersion.getTime()) {
			throw new Meteor.Error(
				'sync-conflict',
				'O documento foi alterado no servidor. Atualize os dados antes de reenviar.'
			);
		}
		await this.serverUpdate(input.document, context);
		return await this.getCollectionInstance().findOneAsync({ _id: input.document._id });
	}

	async uploadAssetChunk(input: IUploadAssetChunk, context: IContext) {
		const allowedKinds: AssetKind[] = ['image', 'audio', 'attachment'];
		const maxEncodedChunkLength = Math.ceil((192 * 1024 * 4) / 3) + 4;
		if (
			!input ||
			!/^[A-Za-z0-9-]{8,80}$/.test(input.assetId || '') ||
			!/^[A-Za-z0-9-]{1,120}$/.test(input.exampleId || '') ||
			!allowedKinds.includes(input.kind)
		) {
			throw new Meteor.Error('invalid-upload', 'Metadados do upload inválidos.');
		}
		const size = Number(input.size);
		const offset = Number(input.offset);
		if (
			typeof input.name !== 'string' ||
			input.name.length < 1 ||
			input.name.length > 180 ||
			typeof input.mimeType !== 'string' ||
			!/^([a-f0-9]{64})$/i.test(input.checksum || '') ||
			typeof input.data !== 'string' ||
			input.data.length > maxEncodedChunkLength ||
			(input.data.length > 0 && !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(input.data)) ||
			!Number.isInteger(size) ||
			size < 0 ||
			size > MAX_UPLOAD_BYTES ||
			!Number.isInteger(offset) ||
			offset < 0 ||
			!isAllowedAttachment({ name: input.name, mimeType: input.mimeType, size })
		) {
			throw new Meteor.Error('invalid-upload', 'Nome, tipo, checksum, tamanho ou bloco do arquivo inválido.');
		}
		if (
			(input.kind === 'image' && !input.mimeType.startsWith('image/')) ||
			(input.kind === 'audio' && !input.mimeType.startsWith('audio/'))
		) {
			throw new Meteor.Error('invalid-upload', 'O tipo do arquivo não corresponde à categoria informada.');
		}

		const example = await this.getCollectionInstance().findOneAsync({ _id: input.exampleId });
		if (!example) throw new Meteor.Error('document-not-found', 'Salve o documento antes de enviar seus arquivos.');
		await this.beforeUpdate({ _id: input.exampleId }, context);
		const existingFile = await attachmentsCollection.attachments.collection.findOneAsync({ _id: input.assetId });
		if (existingFile) {
			if (existingFile.meta?.module !== 'example' || existingFile.meta?.docId !== input.exampleId) {
				throw new Meteor.Error('upload-id-conflict', 'O identificador do arquivo já está em uso.');
			}
			return { complete: true, nextOffset: existingFile.size, ...this.serializeAsset(existingFile) };
		}

		const fs = require('fs').promises;
		const path = require('path');
		const os = require('os');
		const crypto = require('crypto');
		const ownerKey = crypto
			.createHash('sha256')
			.update(`${context.user._id}:${input.exampleId}`)
			.digest('hex')
			.slice(0, 24);
		const incomingDirectory = path.join(os.tmpdir(), 'boilerplate-example-uploads', ownerKey);
		await fs.mkdir(incomingDirectory, { recursive: true });
		const tempPath = path.join(incomingDirectory, `${input.assetId}.part`);
		const chunk = Buffer.from(input.data, 'base64');
		if (chunk.length > 192 * 1024) throw new Meteor.Error('invalid-upload', 'Bloco do arquivo maior que 192 KiB.');
		const stat = await fs.stat(tempPath).catch(() => ({ size: 0 }));
		if (stat.size > size)
			throw new Meteor.Error('upload-size-mismatch', 'O arquivo temporário excede o tamanho declarado.');
		if (offset > stat.size) throw new Meteor.Error('upload-offset', `Retome o upload no byte ${stat.size}.`);
		if (offset < stat.size) return { complete: false, nextOffset: stat.size };
		if (chunk.length) await fs.appendFile(tempPath, chunk);
		if (size === 0 && offset === 0) await fs.writeFile(tempPath, Buffer.alloc(0));
		const nextOffset = stat.size + chunk.length;
		if (nextOffset > size) throw new Meteor.Error('upload-size-mismatch', 'O arquivo excedeu o tamanho declarado.');
		if (!input.isLast) return { complete: false, nextOffset };
		if (nextOffset !== size) {
			throw new Meteor.Error('upload-incomplete', `O upload deve continuar no byte ${nextOffset}.`);
		}

		const digest = await new Promise<string>((resolve, reject) => {
			const hash = crypto.createHash('sha256');
			const stream = require('fs').createReadStream(tempPath);
			stream.on('data', (data: Buffer) => hash.update(data));
			stream.on('error', reject);
			stream.on('end', () => resolve(hash.digest('hex')));
		});
		if (digest !== input.checksum.toLowerCase()) {
			await fs.unlink(tempPath).catch(() => undefined);
			throw new Meteor.Error('upload-checksum', 'A integridade do arquivo não pôde ser confirmada.');
		}
		const saved = await attachmentsCollection.serverSaveFileFromPath({
			id: input.assetId,
			tempPath,
			name: input.name,
			mimeType: input.mimeType,
			size,
			meta: {
				module: 'example',
				docId: input.exampleId,
				fieldName: input.kind === 'image' ? 'images' : input.kind === 'audio' ? 'audios' : 'files',
				kind: input.kind,
				checksum: digest,
				userId: context.user._id
			}
		});
		await this.getCollectionInstance().updateAsync(
			{ _id: input.exampleId },
			{ $set: { lastupdate: new Date(), updatedby: context.user._id } }
		);
		return { complete: true, nextOffset, ...this.serializeAsset(saved) };
	}

	async removeAsset(input: { assetId: string }, context: IContext) {
		if (!/^[A-Za-z0-9-]{8,80}$/.test(input?.assetId || '')) {
			throw new Meteor.Error('invalid-upload', 'Identificador do arquivo inválido.');
		}
		const file = await attachmentsCollection.attachments.collection.findOneAsync({ _id: input.assetId });
		if (!file) return true;
		if (file.meta?.module !== 'example' && !['files', 'images', 'audios'].includes(file.meta?.fieldName)) {
			throw new Meteor.Error('not-authorized', 'O arquivo não pertence ao módulo Example.');
		}
		const exampleId = file.meta?.docId;
		if (!exampleId) throw new Meteor.Error('invalid-upload', 'O arquivo não está vinculado a um documento.');
		await this.beforeUpdate({ _id: exampleId }, context);
		await attachmentsCollection.attachments.removeAsync({ _id: file._id });
		await this.getCollectionInstance().updateAsync(
			{ _id: exampleId },
			{ $set: { lastupdate: new Date(), updatedby: context.user._id } }
		);
		return true;
	}

	async afterRemove(doc: Partial<IExample>, context: IContext) {
		await super.afterRemove(doc, context);
		if (!doc._id) return;
		await this.tombstones.upsertAsync(
			{ documentId: doc._id },
			{ $set: { documentId: doc._id, deletedAt: new Date() } }
		);
		const files = await attachmentsCollection.find({ 'meta.docId': doc._id }).fetchAsync();
		for (const file of files) await attachmentsCollection.attachments.removeAsync({ _id: file._id });
	}
}

export const exampleServerApi = new ExampleServerApi();
