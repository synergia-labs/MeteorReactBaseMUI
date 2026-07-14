import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import Dropzone, { type FileRejection } from 'react-dropzone';
import _ from 'lodash';
import { attachmentsCollection } from '/imports/api/attachmentsCollection';
import Box from '@mui/material/Box';

import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { Meteor } from 'meteor/meteor';

import Snackbar from '@mui/material/Snackbar';

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';

import LinearProgress from '@mui/material/LinearProgress';
import SimpleLabelView from '/imports/ui/components/SimpleLabelView/SimpleLabelView';
import * as appStyle from '/imports/ui/materialui/styles';
import { uploadFilesStyle } from './uploadFilesCollectionStyle';
import Typography from '@mui/material/Typography';
import { retornarErrosUpload } from '/imports/libs/RetornarMensagemErro';
import Tooltip from '@mui/material/Tooltip';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';

const [grey100, grey500, grey700] = ['#eeeeee', '#c9c9c9', '#a1a1a1'];

const styles = {
	textoUploadArquivo: {
		color: grey700,
		// fontFamily: '\'PT\'',
		fontSize: '1.8rem'
	},
	defaultStyle: {
		width: '100%',
		minHeight: 80,
		flex: 1,
		textAlign: 'center',
		borderColor: grey500,
		backgroundColor: grey100,
		borderWidth: '2px',
		borderStyle: 'dashed'
	},
	estiloDoOu: {
		fontSize: '1.5rem',
		color: grey700,
		// fontFamily: '\'PT\'',
		marginBottom: '0.2em'
	},
	iconStyles: {
		fontSize: '3.8rem',
		color: grey700
	},
	botaoUploadStyle: {},

	linhaExclusaoStyle: {
		backgroundColor: grey700,
		textDecoration: 'line-through'
	},

	estiloDoContainerDoUploadFile: {
		height: '170px'
	},

	circularProgress: {
		paddingTop: '50px'
	},
	BoxTeste: {
		position: 'absolute',
		top: '190%',
		left: '50%',
		button: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

export interface IArquivo {
	name: string;
	type?: string;
	size: number;
	link: string;
	_id?: string;
	id: string;
	ext?: string;
	queue?: boolean;
	file?: object;
	index?: number;
	'mime-type'?: string;
	status?: string;
}

interface IUploadFileProps {
	loading: boolean;
	attachments: IArquivo[] | [];
	attachmentsExists: boolean;
}

interface IUploadFileState {
	files: File[];
	arquivosBase64: string[];
	links: Partial<IArquivo>[];
	linksServidor: Partial<IArquivo>[];
	tabelaArquivos: Partial<IArquivo>[] | null;
	isEmUpload: boolean;
	arquivos: Array<IArquivo | Partial<IArquivo>>;
	inProgress?: boolean;
	progress?: number;
	msgError?: string | null;
	uploading?: any;
	uploadFileSize?: string;
	uploadFileMimeType?: string;
	openSnackBar?: boolean | null;
	[key: string]: any;
}

class UploadFile extends React.Component<IUploadFileProps & IUploadFilesCollection, IUploadFileState> {
	fileQueue: Partial<IArquivo>[];
	arquivosServ: Partial<IArquivo>[];
	currentFileUpload?: number;
	private fileInputRef: any = null;
	static defaultProps: Partial<IUploadFilesCollection>;

	constructor(props: IUploadFileProps & IUploadFilesCollection) {
		super(props);
		this.fileQueue = [];
		this.arquivosServ = this.props.value || [];
		this.state = {
			files: [],
			arquivosBase64: [],
			links: [],
			linksServidor: [],
			tabelaArquivos: null,
			isEmUpload: false,
			arquivos: this.props.attachments || [],
			openSnackBar: null
		};
	}

	static getDerivedStateFromProps(nextProps: IUploadFileProps) {
		const arquivos: Partial<IArquivo>[] = [...(nextProps.attachments || [])];

		return {
			arquivos,
			attachmentsExists: nextProps.attachmentsExists
		};
	}

	componentDidUpdate(prevProps: IUploadFileProps, _prevState: IUploadFileState) {
		const arquivos: Partial<IArquivo>[] = [...(this.props.attachments || [])];
		if (
			!_.isEqual(this.props.attachments, prevProps.attachments) ||
			(this.props.attachments.length > 0 && this.state.links.length === 0)
		) {
			this.fileQueue.forEach((arquivo) => {
				!arquivos.find((a) => a.name === arquivo.name && a.status === arquivo.status) && arquivos.push(arquivo);
			});
			this.mostrarLinksArquivos(arquivos);
		}

		return null;
	}

	getFileSize = (size: number) => {
		if (size > this.props.maxSize) {
			this.setState({
				msgError: `O tamanho do arquivo excede o limite de ${(
					this.props.maxSize /
					(1024 * 1024)
				).toFixed()}MB permitido.`
			});
			this.setState({ openSnackBar: true });
		}

		return size / 1024 < 1000 ? `${(size / 1024).toFixed(2)}KB` : `${(size / (1024 * 1024)).toFixed(2)}MB`;
	};

	onChange = (value: any) => {
		const event = {
			name: this.props.name,
			target: {
				name: this.props.name,
				value
			}
		};
		if (this.props.saveOnChange) {
			this.props.saveOnChange({ ...this.props.doc, [this.props.name]: value });
		}
		this.props.onChange(event);
	};

	getIcon = (mimeType?: string) => {
		if (!mimeType) {
			return '-';
		}

		const type = {
			base: mimeType.split('/')[0],
			fileType: mimeType.split('/')[1]
		};

		switch (type.base) {
			case 'text':
				return <SysIcon name={'bookLibrary'} style={{ color: appStyle.secondaryOnHover }} />;
			case 'audio':
				return <SysIcon name={'musicLibrary'} style={{ color: appStyle.secondaryOnHover }} />;
			case 'image':
				return <SysIcon name={'image'} style={{ color: appStyle.secondaryOnHover }} />;
			case 'video':
				return <SysIcon name={'videoLibrary'} style={{ color: appStyle.secondaryOnHover }} />;

			case 'application':
				if (type.fileType === 'pdf') {
					return <SysIcon name={'book'} style={{ color: appStyle.secondaryOnHover }} />;
				}
				if (type.fileType.indexOf('msword') !== -1) {
					return <SysIcon name={'book'} style={{ color: appStyle.secondaryOnHover }} />;
				}
				return <SysIcon name={'attachFile'} style={{ color: appStyle.secondaryOnHover }} />;

			default:
				return <SysIcon name={'attachFile'} style={{ color: appStyle.secondaryOnHover }} />;
		}
	};

	mostrarLinksArquivos = (arquivos: Partial<IArquivo>[]) => {
		// const { arquivos, progress } = this.state || [];

		let listaArquivos: [] | Partial<IArquivo>[] = [];
		if (arquivos.length > 0) {
			listaArquivos = arquivos.map((item) => {
				const link =
					item.status && item.status === 'InProgress'
						? item.link
						: attachmentsCollection.attachments.findOne({ _id: item._id })?.link();
				return {
					name: item.name,
					id: item._id,
					size: item.size,
					status: item.status || 'Complete',
					type: item['mime-type'],
					identificador: item.name,
					index: item.index,
					link
				};
			});
		}

		this.setState({
			links: [...listaArquivos]
		});
	};

	/**
	 * É executado após um arquivo ser solto/adicionado via clique.
	 *
	 * @param acceptedFiles - array com arquivos aceitos pelos parametros do component Dropzone
	 * @param rejectedFiles - array com arquivos recusados pelos parametros do component Dropzone
	 */
	// TODO limitar a n arquivos, parametrizado, no componente UploadPhotoComponent
	onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
		if (rejectedFiles.length === 0) {
			const arquivos = this.state.arquivos;
			const self = this;
			let firstFile: Partial<IArquivo> | null = null;
			acceptedFiles.forEach((file, index: number) => {
				const arquivo: Partial<IArquivo> = {
					name: file.name.split('.')[0],
					ext: file.name.split('.')[1],
					link: URL.createObjectURL(file),
					status: 'InProgress',
					queue: true,
					size: file.size,
					index,
					file
				};

				if ((arquivo.size ?? 0) <= 0) {
					this.setState({ msgError: `O arquivo "${file.name}" está vazio.`, openSnackBar: true });
					return;
				}

				if (!firstFile) {
					firstFile = arquivo;
				}

				this.fileQueue.push(arquivo);

				arquivos.push(arquivo);

				// ToDo Criar um array de Files e salvar no Servidor!
				// ToDo Somente salvar o Arquivo após a solicitação estar salva.
			});

			self.setState(
				{
					arquivos,
					uploading: [],
					progress: 0,
					inProgress: false
				},
				() => {
					self.mostrarLinksArquivos(arquivos);
					self.uploadIt(null, firstFile);
				}
			);
		} else {
			const mensagemTamanho = {
				tamanhoRejeitados: `O tamanho do arquivo excede o limite de ${(
					this.props.maxSize /
					(1024 * 1024)
				).toFixed()}MB permitido.`
			};
			const mensagem = retornarErrosUpload(rejectedFiles, {
				...this.props.mensagens,
				...mensagemTamanho
			});
			this.setState({
				msgError: `${mensagem}`
			});
			this.setState({ openSnackBar: true });
		}
	};

	downloadURI = (uri: string, name: string) => {
		const link = document.createElement('a');
		link.download = name;
		link.href = uri;
		link.click();
	};

	getListReadOnly = () =>
		this.state.links.length > 0 ? (
			this.state.links.map((item) => {
				const filetype = item.type ? item.type.split('/')[0] : null;
				const doc = typeof this.props.doc === 'function' ? this.props.doc() : this.props.doc;
				return (
					<ListItem
						sx={{
							width: 'inherit'
						}}
						dense
						key={item.id || item.name}
						onClick={() => {
							if ((filetype === 'video' || filetype === 'audio') && doc?._id) {
								window.open(`/media/${doc._id}/${item.id ?? ''}`, item.name);
							} else {
								this.downloadURI(item.link ?? '', item.name ?? 'arquivo');
							}
						}}>
						<Avatar
							sx={{
								color: '#fafafa',
								backgroundColor: '#f1f1f1'
							}}
							alt={item.name}>
							{filetype ? (
								item.status && item.status === 'InProgress' ? (
									this.getIcon(this.state.uploadFileMimeType)
								) : (
									this.getIcon(item.type)
								)
							) : (
								<SysIcon name={'cloudUpload'} />
							)}
						</Avatar>
						<ListItemText
							primary={
								<Typography variant="subtitle2" color={'primary'}>
									{item.name}
								</Typography>
							}
							secondary={
								<Typography variant="body2" color={'textDisabled'}>
									{item.status && item.status === 'InProgress' ? (
										<LinearProgress
											color={item.status && item.status === 'InProgress' ? 'secondary' : 'primary'}
											classes={
												item.status && item.status === 'InProgress'
													? { barColorSecondary: appStyle.onBackground }
													: undefined
											}
											variant="determinate"
											value={
												item.status && item.status === 'InProgress' && item.index === this.currentFileUpload
													? this.state.progress
													: item.status && item.status === 'InProgress'
														? 0
														: 100
											}
										/>
									) : (item.size ?? 0) / 1024 < 1000 ? (
										`${((item.size ?? 0) / 1024).toFixed(2)}KB`
									) : (
										`${((item.size ?? 0) / (1024 * 1024)).toFixed(2)}MB`
									)}
								</Typography>
							}
							style={uploadFilesStyle.containerList}
						/>
						<Tooltip title={'Fazer download'}>
							<IconButton>
								<SysIcon name={'download'} sx={{ color: appStyle.secondaryOnHover }} />
							</IconButton>
						</Tooltip>
					</ListItem>
				);
			})
		) : (
			<Box sx={uploadFilesStyle.containerNoFiles}>{'Não há arquivos'}</Box>
		);

	getList = () =>
		this.state.links.length > 0
			? this.state.links.map((item) => {
					const filetype = item.type ? item.type.split('/')[0] : null;
					return (
						<ListItem
							sx={{
								width: 'inherit'
							}}
							dense
							key={item.id || item.name}>
							<Avatar
								sx={{
									color: '#fafafa',
									backgroundColor: '#f1f1f1'
								}}
								alt={item.name}>
								{filetype ? (
									item.status && item.status === 'InProgress' ? (
										this.getIcon(this.state.uploadFileMimeType)
									) : (
										this.getIcon(item.type)
									)
								) : (
									<SysIcon name={'cloudUpload'} />
								)}
							</Avatar>
							<ListItemText
								primary={
									<Typography variant="subtitle2" color={'primary'}>
										{item.name}
									</Typography>
								}
								secondary={
									<Typography variant="body2" color={'textDisabled'}>
										{item.status && item.status === 'InProgress' ? (
											<LinearProgress
												color={item.status && item.status === 'InProgress' ? 'secondary' : 'primary'}
												classes={
													item.status && item.status === 'InProgress'
														? {
																barColorSecondary: appStyle.onBackground
															}
														: undefined
												}
												variant="determinate"
												value={
													item.status && item.status === 'InProgress' && item.index === this.currentFileUpload
														? this.state.progress
														: item.status && item.status === 'InProgress'
															? 0
															: 100
												}
											/>
										) : (item.size ?? 0) / 1024 < 1000 ? (
											`${((item.size ?? 0) / 1024).toFixed(2)}KB`
										) : (
											`${((item.size ?? 0) / (1024 * 1024)).toFixed(2)}MB`
										)}
									</Typography>
								}
								style={uploadFilesStyle.containerList}
							/>
							<Tooltip title={'Cancelar'}>
								<IconButton onClick={() => this.excluirArquivo(item.id ?? '')}>
									<SysIcon name={'close'} sx={{ color: appStyle.secondaryOnHover }} />
								</IconButton>
							</Tooltip>
						</ListItem>
					);
				})
			: null;

	getConteudoDropzoneEmUpload = () => <Box sx={uploadFilesStyle.containerStatusUpload}>{'Enviando'}</Box>;

	getConteudoDropzone = (getRootProps: any, getInputProps: any, isDragActive: boolean) => (
		<Box
			data-cy="dropzone"
			style={{
				...uploadFilesStyle.containerDropzone,
				backgroundColor: isDragActive ? '#f2f2f2' : undefined
			}}
			{...getRootProps()}>
			<input {...getInputProps()} />
			<Box
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#858585'
				}}>
				<Box sx={{ textAlign: 'center' }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<SysIcon name={'add'} />
						<Typography variant="body1">Adicionar arquivos</Typography>
					</Box>
					<Typography variant="body2" color={'textDisabled'}>
						{'Ou solte seus arquivos aqui'}
					</Typography>
				</Box>
			</Box>
		</Box>
	);

	excluirArquivo = (id: string) => {
		const self = this;
		Meteor.call('RemoveFile', id, (err: boolean) => {
			if (err) {
				console.log(err);
			} else {
				const arquivos = self.state.arquivos.filter((item) => item._id !== id);
				self.onChange(arquivos);
				self.setState({ arquivos }, () => self.mostrarLinksArquivos(arquivos));
			}
		});
	};

	uploadIt = (e: any, fileUpload: Partial<IArquivo> | null) => {
		let file;
		const self = this;

		if (e) {
			e.preventDefault();

			if (e.currentTarget.files && e.currentTarget.files[0]) {
				// We upload only one file, in case
				// there was multiple files selected
				file = e.currentTarget.files[0];
			}
		} else {
			file = fileUpload?.file;
		}

		const doc = typeof this.props.doc === 'function' ? this.props.doc() : this.props.doc;

		if (file) {
			let uploadInstance;
			try {
				uploadInstance = attachmentsCollection.attachments.insert(
					{
						file,
						meta: {
							fieldName: this.props.name,
							docId: doc?._id || 'Error',
							userId: Meteor.userId() // Optional, used to check on server for file tampering
						},
						chunkSize: 'dynamic',
						allowWebWorkers: true // If you see issues with uploads, change this to false
					},
					false
				);
			} catch (e) {
				console.error(e);
				this.setState({ msgError: `O arquivo "${file.name}" não foi anexado.`, openSnackBar: true });
				return;
			}

			this.currentFileUpload = fileUpload?.index;

			self.setState({
				msgError: null,
				uploading: uploadInstance, // Keep track of this instance to use below
				inProgress: true // Show the progress bar now
			});

			// These are the event functions, don't need most of them, it shows where we are in the process
			uploadInstance.on('start', () => {
				// console.log('Starting');
			});

			uploadInstance.on('end', () => {
				// console.log('End');
				self.setState({
					progress: 0
				});
			});

			uploadInstance.on('uploaded', (error: string | null, fileObj: any): void => {
				if (error) {
					console.log(error);
				}

				const attachs = [];
				let hasInsertedOjb = false;
				attachmentsCollection.attachments
					.find({
						'meta.docId': doc?._id ?? 'Error',
						'meta.fieldName': self.props.name
					})
					.fetch()
					.forEach((file: any) => {
						attachs.push({
							name: file.name,
							size: file.size,
							type: file.type,
							link: file.link ? file.link() : null,
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
					// const fileInsert = attachmentsCollection.attachments.findOne({ _id: fileObj._id });
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

				const newFileQueue = self.fileQueue;

				newFileQueue.shift(); // Remove Actual File Upload

				if (newFileQueue.length > 0) {
					const nextFile = newFileQueue[0];
					self.uploadIt(null, nextFile);
				} else {
					self.onChange(attachs);
					// Remove the filename from the upload box
					if (this.fileInputRef?.inputRef?.current) {
						this.fileInputRef.inputRef.current.value = '';
					}

					// Reset our state for the next file
					self.setState({
						uploading: [],
						progress: 0,
						inProgress: false
					});
				}
			});

			uploadInstance.on('error', (error: string) => {
				console.log(`Error during upload: ${error}`);
			});

			uploadInstance.on('progress', (progress: number, fileObj: IArquivo) => {
				const uploadSize = (Number(progress) / 100) * fileObj.size;
				// Update our progress bar
				self.setState({
					uploadFileSize: `${this.getFileSize(uploadSize)}/${this.getFileSize(fileObj.size)}`,
					progress,
					uploadFileMimeType: fileObj['mime-type']
				});
			});

			uploadInstance.start(); // Must manually start the upload
		}
	};

	render() {
		const doc = typeof this.props.doc === 'function' ? this.props.doc() : this.props.doc;
		if (!doc || !doc._id) {
			return null;
		}

		return (
			<Box
				key={this.props.name}
				style={{
					...appStyle.fieldContainer,
					...uploadFilesStyle.containerUploadFiles,
					backgroundColor: this.props.error ? '#FFF6F6' : undefined
				}}>
				<SimpleLabelView label={this.props.label ?? ''} help={this.props.help} disabled={this.props.readOnly} />
				{this.props.readOnly ? (
					<Box sx={uploadFilesStyle.containerListReadOnly}>{this.getListReadOnly()}</Box>
				) : (
					<Box sx={uploadFilesStyle.containerShowFiles}>
						<Box sx={uploadFilesStyle.subContainerShowFiles}>
							{!!this.state.msgError && (
								<Snackbar
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left'
									}}
									open={!!this.state.openSnackBar}
									autoHideDuration={16000}
									onClose={() => this.setState({ openSnackBar: null })}>
									<Alert
										id={'message-id'}
										icon={false}
										aria-label={'message-id'}
										onClose={() => this.setState({ openSnackBar: null })}
										severity={'error'}
										elevation={6}
										variant="filled">
										<Box
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'left'
											}}>
											<Box>{'Erro ao realizar upload de arquivo!'}</Box>
											<Box>{this.state.msgError}</Box>
										</Box>
									</Alert>
								</Snackbar>
							)}
							<Dropzone
								onDrop={this.onDrop}
								preventDropOnDocument={this.props.preventDropOnDocument}
								noClick={this.props.disableClick}
								multiple={this.props.multiple}
								minSize={this.props.minSize}
								maxSize={this.props.maxSize}
								accept={this.props.accept as any}
								ref={(fileInputRef) => {
									this.fileInputRef = fileInputRef;
								}}>
								{({ getRootProps, getInputProps, isDragActive }) => (
									<Box
										style={{
											...uploadFilesStyle.containerGetConteudoDropzone,
											border: this.props.error
												? '1px dashed red'
												: isDragActive
													? `1px dashed ${appStyle.onBackground}`
													: '1px dashed rgb(189, 189, 189)'
										}}>
										<Box />
										{this.state.inProgress
											? this.getConteudoDropzoneEmUpload()
											: this.getConteudoDropzone(getRootProps, getInputProps, isDragActive)}
									</Box>
								)}
							</Dropzone>
						</Box>
						{this.state.links.length > 0 ? (
							<Box sx={uploadFilesStyle.containerGetListFiles}>{this.getList()}</Box>
						) : null}
					</Box>
				)}
			</Box>
		);
	}
}

UploadFile.defaultProps = {
	preventDropOnDocument: false,
	disableClick: false,
	multiple: true,
	minSize: 0,
	maxSize: 1048576 * 15, // (15MB)
	accept:
		'.xlsx, .xls, image/jpeg, image/png, image/jpg, image/svg, image/bmp, image/gif,' +
		' .doc, .docx, .csv, .odt, .ods, .txt, .pdf, .zip, .rar, .gz',
	mensagens: {
		label: 'Selecione ou solte seu arquivo aqui.',
		arquivosRejeitados:
			'Tipos de arquivos permitidos: .xlsx, .xls,' +
			' .jpeg, .png, .jpg, .svg, .bmp, .gif, .doc, .docx, .odt, .ods, .txt, .csv' +
			' .pdf, .zip, .rar, .gz.',
		tabelaVazia: 'Tabela vazia'
	},
	onChange: () => {},
	typeConteudo: '',
	value: []
};

interface IUploadFilesCollection {
	preventDropOnDocument: boolean;
	name: string;
	error: boolean;
	disableClick: boolean;
	multiple: boolean;
	minSize: number;
	maxSize: number;
	accept: string;
	mensagens: {
		label: string;
		arquivosRejeitados: string;
		tamanhoRejeitados?: string;
		tabelaVazia: string;
	};
	onChange: (x: any) => any;
	saveOnChange: (doc: object) => void;
	typeConteudo: string;
	value: [];
	doc?: { _id: string | undefined } | (() => { _id: string | undefined });
	label?: string;
	help?: string;
	readOnly?: boolean;
	isPublic: boolean;
	activeStyle: object;
	activeClassName: string;
}

const UploadFilesCollection = withTracker((props: IUploadFilesCollection) => {
	const doc = typeof props.doc === 'function' ? props.doc() : props.doc;
	const handleAttachments = Meteor.subscribe('files-attachments', {
		'meta.docId': doc ? doc._id : 'No-ID'
	});
	const loading = !handleAttachments.ready();
	const attachments = attachmentsCollection
		.find({
			'meta.docId': doc ? doc._id || 'No-ID' : 'No-ID',
			'meta.fieldName': props.name ? props.name || 'No-FieldName' : 'No-FieldName'
		})
		.fetch();
	const attachmentsExists = !loading && !!attachments;
	return {
		loading,
		attachments,
		attachmentsExists,
		...props
	};
})(UploadFile);

export default UploadFilesCollection;
