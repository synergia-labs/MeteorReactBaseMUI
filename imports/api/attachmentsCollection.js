import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';

let uploadPaths = null;
if (Meteor.isServer) {
	const fs = require('fs');

	uploadPaths = `${Meteor.absolutePath.split('/').slice(0, -1).join('/')}/uploads/meteorUploads`;

	if (!fs.existsSync(uploadPaths)) {
		fs.mkdirSync(uploadPaths, { recursive: true });
	}
}

class AttachmentsCollection {
	constructor() {
		/**
		 * Don't forget to change the path to the server path
		 */
		// const storagePath = path: '/home/servicedesk/DEPLOY/LINIO_SERVICEDESK_PRODUCAO/bundle/uploads'
		this.attachments = new FilesCollection({
			collectionName: 'Attachments',
			allowClientCode: false, // actions from client
			// Mudar a cada versão
			// ToDo Colocar em uma variável de ambiente
			storagePath: uploadPaths,
			onBeforeUpload(file) {
				// Allow upload files under 10MB, and only in png/jpg/jpeg formats
				if (
					file.size <= 1048576 * 15 && // (15MB)
					/xlsx|xls|jpeg|png|jpg|svg|bmp|gif|doc|docx|odt|ods|txt|pdf|csv|zip|rar|gz/i.test(file.extension)
				) {
					return true;
				}
				return 'Please upload image, with size equal or less than 10MB';
			}
		});
		if (Meteor.isServer) {
			/* Allow all
			 * @see http://docs.meteor.com/#/full/allow
			 */
			this.attachments.allowClient();
		}
		this.applyPublication();
		this.serverGetFileFileByDocId('MapaCalorConfig');
	}

	applyPublication = () => {
		const self = this;
		if (Meteor.isServer) {
			Meteor.methods({
				RemoveFile: (id) => {
					check(id, String);
					try {
						const file = self.attachments.findOne({ _id: id });
						if (file) {
							file.remove();
						}
					} catch (e) {
						// console.log('Error on Remove File',e);
						return true;
					}
				}
			});

			Meteor.publish('files-attachments', (filter) => {
				check(filter, Object);
				return self.attachments.collection.find({ ...filter });
			});
		}
	};

	find = (filter) => this.attachments.collection.find(filter);

	getAttachmentDoc = (doc) => ({
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

	serverInsert = (doc) => {
		this.attachments.collection.insert(doc);
	};

	serverGetFileFileByDocId = (id) => {
		const docFile = this.find({ 'meta.docId': id }).fetch()[0];
		return docFile && docFile.path ? docFile.path : null;
	};

	serverSaveCSVFile = async (file, fileName) => {
		if (Meteor.isServer) {
			const fileId = shortid.generate();
			const nameFile = `${fileName ? fileName : fileId}.csv`;
			const fs = require('fs').promises;
			const fileSave = await fs.writeFile(`${uploadPaths}/${nameFile}`, file);
			const fileStat = await fs.stat(`${uploadPaths}/${nameFile}`);
			const fileData = {
				_id: fileId,
				name: nameFile,
				size: fileStat.size,
				path: `${uploadPaths}/${nameFile}`
			};
			this.serverInsert(this.getAttachmentDoc(fileData));
			return `${Meteor.absoluteUrl()}cdn/storage/Attachments/${fileId}/original/${nameFile}`;
		}
	};

	findOne = (filter) => this.attachments.findOne(filter);

	getCollection = () => this.attachments;
}

export const attachmentsCollection = new AttachmentsCollection();
