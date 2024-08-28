import { withTracker } from 'meteor/react-meteor-data';
import React from 'react';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import { attachmentsCollection } from '/imports/api/attachmentsCollection';
import { Meteor } from 'meteor/meteor';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import { uploadImagesStyle } from './uploadImagesCollectionStyle';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { isMobile } from '/imports/libs/deviceVerify';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';


const { grey100, grey500, grey700 } = ['#eeeeee', '#c9c9c9', '#a1a1a1'];

const styles = {
	textoUploadArquivo: {
		color: grey700,
		//fontFamily: '\'PT\'',
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
		//fontFamily: '\'PT\'',
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
	divTeste: {
		position: 'absolute',
		top: '190%',
		left: '50%',
		button: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

interface IArquivo {
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
	files: [];
	arquivosBase64: [];
	links: Partial<IArquivo>[] | [];
	linksServidor: [];
	tabelaArquivos: null | [];
	isEmUpload: boolean;
	arquivos: IArquivo[] | [];
	inProgress?: boolean;
	progress?: number;
	msgError?: string | null;
	uploading?: [];
	uploadFileSize?: string;
	uploadFileMimeType?: string;
}

class UploadImage extends React.Component<IUploadFileProps & IUploadImagesCollection, IUploadFileState> {
	fileQueue: IArquivo[] | [];
	arquivosServ: [];

	constructor(props: IUploadFileProps & IUploadImagesCollection) {
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
			openSnackBar: null,
			open: false,
			itemDialog: null
		};
	}

	static getDerivedStateFromProps(nextProps: IUploadFileProps) {
		const arquivos = nextProps.attachments || [];

		return {
			arquivos,
			attachmentsExists: nextProps.attachmentsExists
		};
	}

	componentDidMount() {
		const arquivos = this.props.attachments || [];
		this.onChange(arquivos);
	}

	componentDidUpdate(prevProps: IUploadFileProps, prevState: IUploadFileState, snapshot) {
		const arquivos = this.props.attachments || [];

		if (
			!_.isEqual(this.props.attachments, prevProps.attachments) ||
			(this.props.attachments.length > 0 && this.state.links.length === 0)
		) {
			this.fileQueue.forEach((arquivo) => {
				arquivos.push(arquivo);
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

	onClose = () => {
		this.setState({ open: false });
	};

	getIcon = (mimeType) => {
		if (!mimeType) {
			return '-';
		}

		const type = {
			base: mimeType.split('/')[0],
			fileType: mimeType.split('/')[1]
		};

		switch (type.base) {
			case 'text':
				return <SysIcon name={'bookLibrary'} />;
			case 'audio':
				return <SysIcon name={'musicLibrary'} />;
			case 'image':
				return <SysIcon name={'image'} />;
			case 'video':
				return <SysIcon name={'videoLibrary'} />;

			case 'application':
				if (type.fileType === 'pdf') {
					return <SysIcon name={'book'} />;
				}
				if (type.fileType.indexOf('msword') !== -1) {
					return <SysIcon name={'book'} />;
				}
				return <SysIcon name={'attachFile'} />;

			default:
				return <SysIcon name={'attachFile'} />;
		}
	};

	mostrarLinksArquivos = (arquivos: IArquivo[]) => {
		// const { arquivos, progress } = this.state || [];

		let listaArquivos: [] | Partial<IArquivo>[] = [];
		if (arquivos.length > 0) {
			listaArquivos = arquivos.map((item) => {
				const link =
					item.status && item.status === 'InProgress'
						? item.link
						: attachmentsCollection.attachments.findOne({ _id: item._id }).link();
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

		const preparedList = [];
		listaArquivos.forEach((arq) => {
			if (!preparedList.find((f) => f.id + f.name === arq.id + arq.name)) {
				preparedList.push(arq);
			}
		});

		this.setState({
			links: [...preparedList]
		});
	};

	/**
	 * É executado após um arquivo ser solto/adicionado via clique.
	 *
	 * @param acceptedFiles - array com arquivos aceitos pelos parametros do component Dropzone
	 * @param rejectedFiles - array com arquivos recusados pelos parametros do component Dropzone
	 */
	// TODO limitar a n arquivos, parametrizado, no componente UploadPhotoComponent
	onDrop = (acceptedFiles: { name: string; preview: string; size: number }[], rejectedFiles: []) => {
		if (rejectedFiles.length === 0) {
			const arquivos = this.state.arquivos;
			const self = this;
			let firstFile: Partial<IArquivo> | null = null;

			acceptedFiles.forEach((file, index: number) => {
				const arquivo: Partial<IArquivo> = {
					name: file.name.split('.')[0],
					ext: file.name.split('.')[1],
					link: file.preview,
					status: 'InProgress',
					queue: true,
					size: file.size,
					index,
					file
				};

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
			this.setState({
				msgError: `${this.props.mensagens.arquivosRejeitados}`
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

	changeImage = (increment: number) => {
		if (!this.state.itemDialog) {
			return;
		}

		const currentIndex = (this.state.links || []).findIndex((object) => {
			return object.id === this.state.itemDialog.id;
		});

		if (currentIndex + increment >= (this.state.links || []).length && this.state.links[0]) {
			this.showDialog(this.state.links[0]);
		} else if (currentIndex + increment < 0 && this.state.links[this.state.links.length - 1]) {
			this.showDialog(this.state.links[this.state.links.length - 1]);
		} else if (this.state.links[currentIndex + increment]) {
			this.showDialog(this.state.links[currentIndex + increment]);
		} else {
			console.log('Error', currentIndex + increment);
		}
	};

	showDialog = (item: object) => {
		this.setState({ open: true, itemDialog: item });
	};

	getList = (item, numCardPage, readOnly) => {
		return (
			<Card key={'photos' + item.name} style={{ ...uploadImagesStyle.media }}>
				<CardMedia
					key={item.link + item.status}
					style={{ ...uploadImagesStyle.media }}
					// image={item.status && item.status === 'InProgress' ? (undefined) : item.link}
					title={item.name}
					onClick={() => this.showDialog(item)}>
					<img
						src={item.status && item.status === 'InProgress' ? undefined : item.link}
						onError={(e) => {
							e.target.onerror = null;
							e.target.src = '/images/wireframe/imagem_default.png';
						}}
						style={{ maxWidth: 255, maxHeight: 200 }}
					/>
					{item.status && item.status === 'InProgress' ? (
						<div
							style={
								item.status && item.status === 'InProgress'
									? {
											width: '100%',
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center'
										}
									: uploadImagesStyle.caption
							}>
							<LinearProgress
								color={item.status && item.status === 'InProgress' ? 'secondary' : 'primary'}
								classes={item.status && item.status === 'InProgress' ? { barColorSecondary: '#DDF' } : undefined}
								variant="determinate"
								value={
									item.status && item.status === 'InProgress' && item.index === this.currentFileUpload
										? this.state.progress
										: item.status && item.status === 'InProgress'
											? 0
											: 100
								}
							/>
						</div>
					) : (
						<div style={uploadImagesStyle.mediaCaption}>
							<div style={uploadImagesStyle.caption}>
								{item.name}
								<br />
							</div>

							{!readOnly && (
								<IconButton
									style={uploadImagesStyle.delete}
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();
										this.excluirArquivo(item.id);
									}}>
									<SysIcon name={'delete'} fontSize="small" style={uploadImagesStyle.deleteIcon} />
								</IconButton>
							)}
						</div>
					)}
				</CardMedia>
			</Card>
		);
	};

	getConteudoDropzoneEmUpload = () => <div style={uploadImagesStyle.containerStatusUpload}>{'Enviando'}</div>;

	getConteudoDropzone = (getRootProps: any, getInputProps: any, isDragActive: boolean) => (
		<div
			data-cy="dropzone"
			style={{
				...uploadImagesStyle.containerDropzone,
				backgroundColor: isDragActive ? '#f2f2f2' : undefined
			}}
			{...getRootProps()}>
			<input {...getInputProps()} />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					color: '#858585'
				}}>
				<div style={{ textAlign: 'center' }}>
					<Typography
						component={'p'}
						style={{
							//fontFamily: 'PT',
							fontSize: '36px',
							fontWeight: 'normal',
							fontStretch: 'normal',
							fontStyle: 'normal',
							lineHeight: 1.2,
							letterSpacing: '0.7px',
							textAlign: 'center',
							color: '#e26139'
						}}>
						{'+'}
					</Typography>
					<Typography
						component={'p'}
						style={{
							paddingTop: 15,
							paddingBottom: 15,
							//fontFamily: 'PT',
							fontSize: '17px',
							fontWeight: 'bold',
							fontStretch: 'normal',
							fontStyle: 'normal',
							lineHeight: 1.2,
							letterSpacing: '0.7px',
							textAlign: 'center',
							color: '#e26139'
						}}>
						{'Imagens Complementares'}
					</Typography>
				</div>
			</div>
		</div>
	);

	excluirArquivo = (id: string) => {
		const self = this;

		self.setState({
			open: false,
			itemDialog: null
		});

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
			file = fileUpload.file;
		}

		const doc = typeof this.props.doc === 'function' ? this.props.doc() : this.props.doc;

		if (file) {
			const uploadInstance = attachmentsCollection.attachments.insert(
				{
					file,
					meta: {
						fieldName: this.props.name,
						docId: doc._id || 'Error',
						userId: Meteor.userId() // Optional, used to check on server for file tampering
					},
					chunkSize: 'dynamic',
					allowWebWorkers: true // If you see issues with uploads, change this to false
				},
				false
			);

			this.currentFileUpload = fileUpload.index;

			self.setState({
				msgError: null,
				uploading: uploadInstance, // Keep track of this instance to use below
				inProgress: true // Show the progress bar now
			});

			// These are the event functions, don't need most of them, it shows where we are in the process
			uploadInstance.on('start', () => {});

			uploadInstance.on('end', () => {
				self.setState({
					progress: 0
				});
			});

			uploadInstance.on('uploaded', (error: string | null, fileObj: any): void => {
				if (error) {
					console.log(error);
					this.setState({
						msgError: `${this.props.mensagens.arquivosRejeitados}`
					});
					this.setState({ openSnackBar: true });
				}

				const attachs = [];
				let hasInsertedOjb = false;
				attachmentsCollection.attachments
					.find({
						'meta.docId': self.props.doc._id,
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
						if (!!file && !!fileObj && file._id === fileObj._id) {
							hasInsertedOjb = true;
						}
					});

				if (!hasInsertedOjb && !!fileObj) {
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
					const refsName = `fileinput ${this.props.name} ${this.props.key}`;

					if (this[refsName]) {
						this[refsName].value = '';
					} else {
						console.log('refsName not found: ', refsName);
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
				this.setState({
					msgError: `${this.props.mensagens.arquivosRejeitados}`
				});
				this.setState({ openSnackBar: true });
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
		const { links } = this.state;
		const linksSplice = links || []; //[];

		//usar 1, 2, 3, 4, 6 ou 12
		const numCardPage = this.props.readOnly ? 4 : 3;

		// if (links.length > numCardPage - 1) {
		//     for (let i = 0; i <= links.length - 1; i += numCardPage) {
		//         linksSplice.push(links.slice(i, i + numCardPage));
		//     }
		// } else {
		//     linksSplice.push(links);
		// }

		if (!doc || !doc._id) {
			return null;
		}

		return (
			<div
				key={this.props.name}
				style={{
					...uploadImagesStyle.containerUploadFiles,
					backgroundColor: this.props.error ? '#FFF6F6' : undefined
				}}>
				{this.state.itemDialog && (
					<Dialog
						onClose={this.onClose}
						aria-labelledby="Imagem Complementar"
						open={this.state.open}
						maxWidth="xl"
						style={{ height: '85vh', width: '85vw', margin: 'auto' }}>
						<DialogTitle id={this.props.name}>{this.state.itemDialog.name}</DialogTitle>
						<DialogContent
							style={{
								overflow: 'hidden',
								maxHeight: '100%',
								maxWidth: '100%',
								display: 'contents'
							}}>
							<div
								style={{
									width: '100%',
									height: '100%',
									display: 'flex',
									flexDirection: 'row',
									overflow: 'auto',
									position: 'relative',
									alignItems: 'center'
								}}>
								<div
									style={{
										width: '100%',
										height: '100%',
										display: 'flex',
										flexDirection: 'column',
										overflow: 'auto',
										alignItems: 'center'
									}}>
									<img
										src={this.state.itemDialog.link}
										onError={(e) => {
											e.target.onerror = null;
											e.target.src = '/images/wireframe/imagem_default.png';
										}}
										style={{
											marginTop: !isMobile ? '48px' : unset,
											maxWidth: '85vw',
											maxHeight: '85vh'
										}}
									/>
								</div>
								<Grid container spacing={2} style={{ position: 'absolute' }}>
									<Grid item mobile={6}>
										<IconButton
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												this.changeImage(-1);
											}}>
											<SysIcon name={'arrowBackIos'} fontSize="small" style={uploadImagesStyle.arrow} />
										</IconButton>
									</Grid>
									<Grid item mobile={6} display={'flex'} justifyContent="right" flexDirection={'row-reverse'}>
										<IconButton
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												this.changeImage(1);
											}}>
											<SysIcon name={'arrowFowardIos'} fontSize="small" style={uploadImagesStyle.arrow} />
										</IconButton>
									</Grid>
								</Grid>
							</div>
							<div
								style={{
									...uploadImagesStyle.mediaCaption,
									minHeight: '15%',
									width: '100%'
								}}>
								<div
									style={{
										...uploadImagesStyle.caption,
										flexDirection: 'column'
									}}>
									<div style={{ flexDirection: 'row' }}>
										<IconButton
											style={uploadImagesStyle.download}
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												this.downloadURI(this.state.itemDialog.link, this.state.itemDialog.name);
											}}>
											<SysIcon name={'download'} fontSize="small" style={uploadImagesStyle.deleteIcon} />
										</IconButton>
										{this.state.itemDialog.size / 1024 < 1000
											? `${(this.state.itemDialog.size / 1024).toFixed(2)}KB`
											: `${(this.state.itemDialog.size / (1024 * 1024)).toFixed(2)}MB`}
									</div>
								</div>

								<Button
									id="Fechar"
									style={{ opacity: 1 }}
									autoFocus
									onClick={this.onClose}
									variant={'contained'}
									color={'secondary'}>
									{'Fechar'}
								</Button>
							</div>

							{/*<div style={{...uploadImagesStyle.mediaCaption, minHeight: '15%', width: '100%'}}>*/}
							{/*    <Typography style={uploadImagesStyle.caption}>*/}
							{/*        {this.state.itemDialog.name}*/}
							{/*    </Typography>*/}
							{/*    <Typography style={uploadImagesStyle.caption}>*/}
							{/*        {this.state.itemDialog.size / 1024 < 1000 ? `${(this.state.itemDialog.size / 1024).toFixed(2)}KB` : `${(this.state.itemDialog.size / (1024 * 1024)).toFixed(2)}MB`}*/}
							{/*    </Typography>*/}
							{/*</div>*/}
						</DialogContent>
						{/*<DialogActions>*/}
						{/*    <Button id='Fechar' autoFocus onClick={this.onClose} variant={"contained"} color={"secondary"}>*/}
						{/*        {'Fechar'}*/}
						{/*    </Button>*/}
						{/*</DialogActions>*/}
					</Dialog>
				)}

				{this.props.readOnly ? (
					links.length > 0 ? (
						<Container style={{ overflow: 'none', padding: 0 }}>
							<div
								key={'SlideViewOnly'}
								style={{
									maxWidth: '100%',
									width: '100%',
									overflowY: 'none',
									overflowX: 'auto',
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center'
								}}>
								{linksSplice.map((link) => this.getList(link, numCardPage, this.props.readOnly))}
							</div>
						</Container>
					) : (
						<div style={uploadImagesStyle.containerNoFiles}>{'Não há imagens complementares'}</div>
					)
				) : (
					<div style={uploadImagesStyle.containerShowFiles}>
						<div>
							{!!this.state.msgError && (
								<Snackbar
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'left'
									}}
									open={this.state.openSnackBar}
									autoHideDuration={16000}
									onClose={() => this.setState({ openSnackBar: null })}>
									<Alert
										id={'message-id'}
										icon={false}
										arialabel={'message-id'}
										onClose={() => this.setState({ openSnackBar: null })}
										severity={'error'}
										elevation={6}
										variant="filled">
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'left'
											}}>
											<div>{'Erro ao realizar upload de arquivo!'}</div>
											<div>{this.state.msgError}</div>
										</div>
									</Alert>
								</Snackbar>
							)}
						</div>
						<div
							style={{
								minWidth: '100%',
								padding: 10,
								backgroundColor: 'rgb(238, 238, 238)'
							}}>
							<Dropzone
								onDrop={this.onDrop}
								style={styles.defaultStyle}
								activeStyle={this.props.activeStyle}
								activeClassName={this.props.activeClassName}
								preventDropOnDocument={this.props.preventDropOnDocument}
								disableClick={this.props.disableClick}
								multiple={this.props.multiple}
								minSize={this.props.minSize}
								maxSize={this.props.maxSize}
								accept={this.props.accept}
								ref={(fileInputRef) => (this[`fileinput${this.props.name}${this.props.key}`] = fileInputRef)}>
								{({ getRootProps, getInputProps, isDragActive }) => (
									<div
										style={{
											...uploadImagesStyle.containerGetConteudoDropzone,
											border: isDragActive ? '0.5px dashed green' : '0.5px dashed black'
										}}>
										{this.state.inProgress
											? this.getConteudoDropzoneEmUpload()
											: this.getConteudoDropzone(getRootProps, getInputProps, isDragActive)}
									</div>
								)}
							</Dropzone>
							<Container style={{ overflow: 'none', padding: 0 }}>
								<div
									key={'Slide'}
									style={{
										maxWidth: '100%',
										width: '100%',
										overflowY: 'none',
										overflowX: 'auto',
										display: 'flex',
										flexDirection: 'row',
										alignItems: 'center'
									}}>
									{linksSplice.map((link) => this.getList(link, numCardPage, this.props.readOnly))}
								</div>
							</Container>
						</div>
					</div>
				)}
			</div>
		);
	}
}

UploadImage.defaultProps = {
	preventDropOnDocument: false,
	disableClick: false,
	multiple: true,
	minSize: 0,
	maxSize: 1048576 * 15, // (15MB)
	accept: 'image/jpeg, image/png, image/jpg, image/svg, image/bmp, image/gif',
	mensagens: {
		label: 'Selecione ou solte seu arquivo aqui.',
		arquivosRejeitados:
			'Formato ou tamanho não permitido! São permitidas apenas imagens com tamanho máximo de 15 MB e nos seguintes formatos: jpeg, jpg, png,svg, bmp e gif.',
		tabelaVazia: 'Tabela vazia'
	},
	onChange: () => {},
	typeConteudo: '',
	value: []
};

interface IUploadImagesCollection {
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
		tabelaVazia: string;
	};
	onChange: (x: any) => any;
	saveOnChange: (doc: object) => void;
	typeConteudo: string;
	value: [];
	doc?: { _id: number };
	label?: string;
	readOnly?: boolean;
	isPublic: boolean;
	activeStyle: object;
	activeClassName: string;
}

const UploadMultipleImagesCollection = withTracker((props: IUploadImagesCollection) => {
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
})(UploadImage);

export default UploadMultipleImagesCollection;
