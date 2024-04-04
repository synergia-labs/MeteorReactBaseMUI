import React, { useCallback, useContext, useRef } from 'react';
import SysUploadFileStyle from './sysUploadFileStyle';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { SysAppLayoutContext } from '/imports/app/AppLayout';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { AttachFile, Book, Image, LibraryBooks, LibraryMusic, VideoLibrary } from '@mui/icons-material';
import { attachmentsCollection } from '/imports/api/attachmentsCollection';
import { SysFormContext } from '../../sysForm/sysForm';
import { hasValue } from '/imports/libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { Meteor } from 'meteor/meteor';

interface IArquivo {
	name: string;
	type: string;
	size: number;
	_id?: string;
	ext?: string;
	queue?: boolean;
	file?: object;
	index?: number;
	'mime-type'?: string;
	status?: string;
}

interface ISysUploadFile extends ISysFormComponent<any> {
	/** Componente que será exibido no início do campo.*/
	startAdornment?: React.ReactNode;
	/** Componente que será exibido no final do campo.*/
	endAdornment?: React.ReactNode;
	/** Formatos de arquivo válidos. */
	validTypes?: ('text' | 'audio' | 'image' | 'video' | 'application' | string)[];
}

export const SysUploadFile: React.FC<ISysUploadFile> = ({
	name,
	value,
	defaultValue,
	readOnly,
	disabled,
	loading,
	onChange,
	error,
	validTypes = ['text', 'audio', 'image', 'video', 'application'],
	startAdornment,
	endAdornment
}) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = !inSysFormContext ? null : useRef<ISysFormComponentRef>({ name, value: value || defaultValue });
	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);
	const schema = refObject?.current.schema;

	readOnly = readOnly || controllerSysForm.mode === 'view' || schema?.readOnly;
	disabled = disabled || controllerSysForm.disabled;
	loading = loading || controllerSysForm.loading;
	defaultValue = refObject?.current.value || schema?.defaultValue;

	const [visibleState, setVisibleState] = React.useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = React.useState<string | undefined>(error);
	const [files, setFiles] = React.useState<IArquivo[]>(value || defaultValue || []);
	let fileQueue: IArquivo[] | [];

	const { showNotification } = useContext(SysAppLayoutContext);
	const maxSize = 1048576 * 15; // 15MB

	const verifyTypeFile = (typeFile: string, fileSize: number) => {
		if (validTypes.includes(typeFile.split('/')[0])) return verifySize(fileSize);
		else {
			showNotification({
				type: 'error',
				title: 'Formato de arquivo invalido',
				message: `O formato do seu arquivo não é valido.`
			});
			return false;
		}
	};

	const verifySize = (fileSize: number) => {
		if (fileSize > maxSize) {
			showNotification({
				type: 'error',
				title: 'Arquivo muito grande',
				message: `O tamanho do arquivo excede o limite de ${(maxSize / (1024 * 1024)).toFixed()}MB permitido.`
			});
			return false;
		}
		return true;
	};

	React.useEffect(() => {
		if (files && files.length > 0) {
			console.log('AquI >>>>');
			controllerSysForm?.onChangeComponentValue({ refComponent: refObject!, value: files });
		}
	}, [files]);

	const onDrop = useCallback((acceptedFiles: FileWithPath[], rejectedFiles: any[]) => {
		let newFiles: IArquivo[] = [];
		let firstFile: Partial<IArquivo> | null = null;
		acceptedFiles.forEach((file, index: number) => {
			let verify = verifyTypeFile(file.type || '', file.size);
			if (verify) {
				const arquivo: IArquivo = {
					name: file.name.split('.')[0],
					ext: file.name.split('.')[1],
					status: 'InProgress',
					queue: true,
					size: file.size,
					index,
					file,
					type: file.type
				};

				if (arquivo.size <= 0) {
					showNotification({
						type: 'warning',
						title: 'Arquivo não anexado',
						message: `O arquivo "${file.name}" está vazio.`
					});
					return;
				}

				if (!firstFile) {
					firstFile = arquivo;
				}

				//fileQueue.push(arquivo);

				newFiles.push(arquivo);
			}
		});
		setFiles((prevFiles) => [...prevFiles, ...newFiles]);
		uploadIt(null, firstFile);
	}, []);

	const downloadURI = (name: string, arquivo: any) => {
		const link = document.createElement('a');
		link.download = name;
		link.href = URL.createObjectURL(arquivo);
		link.click();
	};

	const removeItem = (indexToRemove: number) => {
		const copy = files.filter((_, index) => index !== indexToRemove);
		setFiles(copy);
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	const getIcon = (mimeType: string) => {
		const type = {
			base: mimeType.split('/')[0],
			fileType: mimeType.split('/')[1]
		};

		switch (type.base) {
			case 'text':
				return <LibraryBooks color="primary" />;
			case 'audio':
				return <LibraryMusic color="primary" />;
			case 'image':
				return <Image color="primary" />;
			case 'video':
				return <VideoLibrary color="primary" />;

			case 'application':
				if (type.fileType === 'pdf') {
					return <Book color="primary" />;
				}
				if (type.fileType.indexOf('msword') !== -1) {
					return <Book color="primary" />;
				}
				return <AttachFile color="primary" />;

			default:
				return <AttachFile color="primary" />;
		}
	};

	const uploadIt = (e: React.ChangeEvent<HTMLInputElement> | null, fileUpload: Partial<IArquivo>) => {
		let file: any;

		if (e) {
			e.preventDefault();
			if (e.currentTarget.files && e.currentTarget.files[0]) {
				// Upload apenas um arquivo, caso
				// tenham sido selecionados vários arquivos
				file = e.currentTarget.files[0];
			}
		} else {
			file = fileUpload?.file;
		}

		if (file) {
			let uploadInstance;
			try {
				uploadInstance = attachmentsCollection.attachments.insert(
					{
						file,
						meta: {
							fieldName: name,
							docId: controllerSysForm.docId || 'Error',
							userId: Meteor.userId() // Optional, used to check on server for file tampering
						},
						chunkSize: 'dynamic',
						allowWebWorkers: true
					},
					false
				);
			} catch (e) {
				console.error(e);
				showNotification({
					type: 'warning',
					title: 'Erro ao anexar arquivo',
					message: `O arquivo "${file.name}" não foi anexado.`
				});
				return;
			}

			uploadInstance.on('uploaded', (error: string | null, fileObj: any): void => {
				if (error) {
					console.log(error);
				}

				const attachs = [];
				let hasInsertedOjb = false;
				attachmentsCollection.attachments
					.find({ 'meta.docId': controllerSysForm.docId, 'meta.fieldName': name })
					.fetch()
					.forEach((file: any) => {
						attachs.push({
							name: file.name,
							size: file.size,
							type: file.type,
							isAudio: file.isAudio,
							isText: file.isText,
							isJSON: file.isJSON,
							isPDF: file.isPDF,
							isVideo: file.isVideo
						});
						if (fileObj && file._id === fileObj._id) {
							hasInsertedOjb = true;
						}
					});

				if (!hasInsertedOjb && fileObj) {
					attachs.push({
						name: fileObj.name,
						size: fileObj.size,
						type: fileObj.type,
						isAudio: fileObj.isAudio,
						isText: fileObj.isText,
						isJSON: fileObj.isJSON,
						isPDF: fileObj.isPDF,
						isVideo: fileObj.isVideo
					});
				}

				const newFileQueue = fileQueue;

				newFileQueue.shift(); // Remove Actual File Upload

				if (newFileQueue.length > 0) {
					const nextFile = newFileQueue[0];
					uploadIt(null, nextFile);
				}
			});
		}
	};

	if (!visibleState) return null;

	return (
		<SysUploadFileStyle.container>
			<SysUploadFileStyle.button {...getRootProps()}>
				<input {...getInputProps()} />
				<SysUploadFileStyle.typographyInfo variant="caption">
					Arraste o arquivo até aqui ou clique abaixo
				</SysUploadFileStyle.typographyInfo>
				<SysUploadFileStyle.typographyAdd variant="button2">
					<AddIcon />
					Adicionar
				</SysUploadFileStyle.typographyAdd>
			</SysUploadFileStyle.button>

			{files && files.length > 0 && (
				<SysUploadFileStyle.itenList>
					{files.map((item: IArquivo, index: number) => (
						<SysUploadFileStyle.boxItem key={index}>
							<SysUploadFileStyle.boxIcon>{getIcon(item.type)}</SysUploadFileStyle.boxIcon>
							<SysUploadFileStyle.cardInfo>
								<SysUploadFileStyle.elipsesText variant="body2" color={(theme) => theme.palette.sysText?.body}>
									{item.name}.{item.ext}
								</SysUploadFileStyle.elipsesText>
								<Typography variant="caption" color={(theme) => theme.palette.sysText?.auxiliary}>
									{item.size}Kb
								</Typography>
							</SysUploadFileStyle.cardInfo>
							<SysUploadFileStyle.boxIconsCard>
								<DeleteIcon color="primary" sx={{ cursor: 'pointer' }} onClick={() => removeItem(index)} />
								<SaveAltIcon
									color="primary"
									onClick={() => downloadURI(item.name, item.file)}
									sx={{ cursor: 'pointer' }}
								/>
							</SysUploadFileStyle.boxIconsCard>
						</SysUploadFileStyle.boxItem>
					))}
				</SysUploadFileStyle.itenList>
			)}
		</SysUploadFileStyle.container>
	);
};
