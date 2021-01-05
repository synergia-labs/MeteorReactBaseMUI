import {withTracker} from 'meteor/react-meteor-data';
import React from 'react';
import Dropzone from 'react-dropzone';
import _ from "lodash";
import {attachmentsCollection} from '/imports/api/attachmentsCollection';

import LibraryBooks from '@material-ui/icons/LibraryBooks';
import LibraryMusic from '@material-ui/icons/LibraryMusic';
import Image from '@material-ui/icons/Image';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import Book from '@material-ui/icons/Book';
import AttachFile from '@material-ui/icons/AttachFile';
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {hasValue} from "/imports/libs/hasValue";
import { Meteor } from 'meteor/meteor';

import withTracker from 'meteor/react-meteor-data/withTracker';
import React from 'react';

import IconButton from '@material-ui/core/IconButton';

import LinearProgress from '@material-ui/core/LinearProgress';
import Delete from '@material-ui/icons/Delete';
import CloudUpload from '@material-ui/icons/CloudUpload';
import SimpleLabelView from "/imports/ui/components/SimpleLabelView/SimpleLabelView";

const {grey100, grey500, grey700} = ['#eeeeee','#c9c9c9','#a1a1a1'];

import {simpleLabelStyle} from "/imports/ui/components/SimpleLabelView/SimpleLabelViewStyle";
import {uploadFilesStyle} from "./uploadFilesCollectionStyle";

const styles = {
    textoUploadArquivo: {
        color: grey700,
        fontFamily: '\'pt-sans\', \'Roboto\', \'Helvetica\', \'Arial\', \'sans-serif\'',
        fontSize: '1.8rem',
    },
    defaultStyle: {
        width: '100%',
        minHeight: 80,
        flex: 1,
        textAlign: 'center',
        borderColor: grey500,
        backgroundColor: grey100,
        borderWidth: '2px',
        borderStyle: 'dashed',
    },
    estiloDoOu: {
        fontSize: '1.5rem',
        color: grey700,
        fontFamily: '\'pt-sans\', \'Roboto\', \'Helvetica\', \'Arial\', \'sans-serif\'',
        marginBottom: '0.2em',
    },
    iconStyles: {
        fontSize: '3.8rem',
        color: grey700,
    },
    botaoUploadStyle: {},

    linhaExclusaoStyle: {
        backgroundColor: grey700,
        textDecoration: 'line-through',
    },

    estiloDoContainerDoUploadFile: {
        height: '170px',
    },

    circularProgress: {
        paddingTop: '50px',
    },
    divTeste: {
        position: 'absolute',
        top: '190%',
        left: '50%',
        button: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const getFileSize = (size:number) => {
    return ((size / 1024 < 1000) ? `${(size / 1024).toFixed(2)}KB` : `${(size /
        (1024 * 1024)).toFixed(2)}MB`);
};


interface IArquivo {
    name: string;
    type?:string;
    size: number;
    link: string;
    _id?: string;
    id:string;
    ext?: string;
    queue?: boolean;
    file?:object;
    index?: number;
    'mime-type'?: string;
    status?: string;
}


interface IUploadFileProps {
    loading: boolean,
    attachments: IArquivo[] | [],
    attachmentsExists:boolean,
}

interface IUploadFileState {
    files:[];
    arquivosBase64: [];
    links: Partial<IArquivo>[] | [];
    linksServidor: [];
    tabelaArquivos: null | [];
    isEmUpload: boolean;
    arquivos: IArquivo[] | [];
    inProgress?:boolean;
    progress?:number;
    msgError?:string | null;
    uploading?: [];
    uploadFileSize?:string;
    uploadFileMimeType?:string
}

class UploadFile extends React.Component<IUploadFileProps & IUploadFilesCollection,IUploadFileState> {
    fileQueue:IArquivo[] | [];
    arquivosServ:[];

    constructor(props: IUploadFileProps & IUploadFilesCollection) {
        super(props)
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
        };
    }

    static getDerivedStateFromProps(nextProps:IUploadFileProps) {
        const arquivos = nextProps.attachments || [];

        return {
            arquivos,
            attachmentsExists: nextProps.attachmentsExists,
        };
    }

    componentDidUpdate(prevProps:IUploadFileProps, prevState:IUploadFileState, snapshot) {

        const arquivos = this.props.attachments || [];

        if (!_.isEqual(this.props.attachments, prevProps.attachments)||this.props.attachments.length>0&&this.state.links.length===0) {
            this.fileQueue.forEach((arquivo) => {
                arquivos.push(arquivo);
            });
            this.mostrarLinksArquivos(arquivos);

        }

        return null;
    }

    onChange = (value:any) => {
        const event = {
            target: {
                value,
            },

        };
        if(this.props.saveOnChange) {
            this.props.saveOnChange({...this.props.doc,[this.props.name]:value});
        }
        this.props.onChange(event);
    };

    getIcon = (mimeType) => {
        if (!mimeType) {
            return '-';
        }

        const type = {
            base: mimeType.split('/')[0],
            fileType: mimeType.split('/')[1],
        };

        switch (type.base) {
            case 'text':
                return <LibraryBooks/>;
            case 'audio':
                return <LibraryMusic/>;
            case 'image':
                return <Image/>;
            case 'video':
                return <VideoLibrary/>;

            case 'application':
                if (type.fileType === 'pdf') {
                    return <Book/>;
                }
                if (type.fileType.indexOf('msword') !== -1) {
                    return <Book/>;
                }
                return <AttachFile/>;

            default:
                return <AttachFile/>;
        }
    };

    mostrarLinksArquivos = (arquivos:IArquivo[]) => {
        //const { arquivos, progress } = this.state || [];

        let listaArquivos:[] | Partial<IArquivo>[] = [];
        if (arquivos.length > 0) {
            listaArquivos = arquivos.map(item => {
                const link = item.status && item.status === 'InProgress'
                    ? item.link
                    : attachmentsCollection.attachments.findOne({_id: item._id}).link();
                return {
                    name: item.name,
                    id: item._id,
                    size: item.size,
                    status: item.status || 'Complete',
                    type: item['mime-type'],
                    identificador: item.name,
                    index: item.index,
                    link,
                };
            });
        }

        this.setState({
            links: [...listaArquivos],
        });
    };

    /**
     * É executado após um arquivo ser solto/adicionado via clique.
     *
     * @param acceptedFiles - array com arquivos aceitos pelos parametros do component Dropzone
     * @param rejectedFiles - array com arquivos recusados pelos parametros do component Dropzone
     */
        // TODO limitar a n arquivos, parametrizado, no componente UploadPhotoComponent
    onDrop = (acceptedFiles: {name:string,preview:string,size:number }[], rejectedFiles:[]) => {
        if (rejectedFiles.length === 0) {
            const arquivos = this.state.arquivos;
            const self = this;
            let firstFile: Partial<IArquivo> | null = null;

            acceptedFiles.forEach((file, index:number) => {
                const arquivo:Partial<IArquivo> = {
                    name: file.name.split('.')[0],
                    ext: file.name.split('.')[1],
                    link: file.preview,
                    status: 'InProgress',
                    queue: true,
                    size: file.size,
                    index,
                    file,
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
                    inProgress: false,
                },
                () => {
                    self.mostrarLinksArquivos(arquivos);
                    self.uploadIt(null, firstFile);
                },
            );
        } else {
            this.setState({
                msgError: `Error: ${this.props.accept}`,
            });
        }
    };

    downloadURI = (uri:string, name:string) => {
        let link = document.createElement('a');
        link.download = name;
        link.href = uri;
        link.click();
    };

    getListReadOnly = () => {
        return (this.state.links.length > 0
            ? this.state.links.map(item => {
                const filetype = item.type ? item.type.split('/')[0] : null;
                return (
                    <ListItem
                        dense
                        button
                        divider
                        key={item.id}
                        onClick={() => {
                            if ((filetype === 'video' || filetype === 'audio') && this.props.doc &&
                                this.props.doc._id) {
                                window.open(`/media/${this.props.doc._id}/${item.id}`, item.name);
                            } else {
                                this.downloadURI(item.link, item.name);
                            }
                        }}
                    >
                        <Avatar alt={item.name}>

                            {filetype ? (item.status && item.status === 'InProgress' ? (
                                this.getIcon(this.state.uploadFileMimeType || null)
                            ) : (
                                this.getIcon(item.type)
                            )) : (
                                <CloudUpload/>
                            )}
                        </Avatar>
                        <ListItemText
                            primary={
                                item.name
                            }
                            secondary={
                                <span>

                        {item.status && item.status === 'InProgress' ? (
                            <LinearProgress
                                color={item.status && item.status === 'InProgress' ? 'secondary' : 'primary'}
                                classes={item.status && item.status === 'InProgress'
                                    ? {barColorSecondary: '#DDF'}
                                    : undefined}
                                variant="determinate"
                                value={item.status && item.status === 'InProgress' && item.index ===
                                this.currentFileUpload ? this.state.progress : (item.status && item.status ===
                                'InProgress' ? 0 : 100)}
                            />
                        ) : (
                            item.size / 1024 < 1000 ? `${(item.size / 1024).toFixed(2)}KB` : `${(item.size /
                                (1024 * 1024)).toFixed(2)}MB`
                        )}
                      </span>
                            }
                            style={uploadFilesStyle.containerListReadOnly}
                        />
                        <IconButton onClick={() => {
                            return this.excluirArquivo(item.id);
                        }}
                        >
                            <Delete/>
                        </IconButton>
                    </ListItem>
                )
            })
            : <div style={uploadFilesStyle.containerNoFiles}>{'Não há arquivos'}</div>)
    };


    getList = () => {
        return (this.state.links.length > 0
            ? this.state.links.map(item => {
                const filetype = item.type ? item.type.split('/')[0] : null;
                return (
                    <ListItem
                        dense
                        button
                        divider
                        key={item.id}
                    >
                        <Avatar alt={item.name}>

                            {filetype ? (item.status && item.status === 'InProgress' ? (
                                this.getIcon(this.state.uploadFileMimeType || null)
                            ) : (
                                this.getIcon(item.type)
                            )) : (
                                <CloudUpload/>
                            )}
                        </Avatar>
                        <ListItemText
                            primary={
                                item.name
                            }
                            secondary={
                                <span>

                        {item.status && item.status === 'InProgress' ? (
                            <LinearProgress
                                color={item.status && item.status === 'InProgress' ? 'secondary' : 'primary'}
                                classes={item.status && item.status === 'InProgress'
                                    ? {barColorSecondary: '#DDF'}
                                    : undefined}
                                variant="determinate"
                                value={item.status && item.status === 'InProgress' && item.index ===
                                this.currentFileUpload ? this.state.progress : (item.status && item.status ===
                                'InProgress' ? 0 : 100)}
                            />
                        ) : (
                            item.size / 1024 < 1000 ? `${(item.size / 1024).toFixed(2)}KB` : `${(item.size /
                                (1024 * 1024)).toFixed(2)}MB`
                        )}
                      </span>
                            }
                            style={uploadFilesStyle.containerListReadOnly}
                        />
                        <IconButton onClick={() => {
                            return this.excluirArquivo(item.id);
                        }}
                        >
                            <Delete/>
                        </IconButton>
                    </ListItem>
                )
            })
            : null)


    };

    getConteudoDropzoneEmUpload = () => {
        return (
            <div style={uploadFilesStyle.containerStatusUpload}>
                {'Enviando'}
            </div>
        );
    };

    getConteudoDropzone = (getRootProps:any, getInputProps:any,  isDragActive:boolean, isDragReject:boolean) => {
        return (
            <div style={{...uploadFilesStyle.containerDropzone ,
                backgroundColor: isDragReject? 'rgba(144,52,52,0.22)' :
                    isDragActive ? 'rgba(69,144,52,0.22)' : undefined
                }}
                 {...getRootProps()}>
                <input {...getInputProps()} />
                <CloudUpload/> {'Solte um arquivo aqui'}

                {isDragReject? 'Arquivo não permitido!' :
                    isDragActive ? 'Arquivo permitido!' : 'Clique aqui para adicionar uma arquivo'}
            </div>
        );
    };

    excluirArquivo = (id:string) => {
        const self = this;
        Meteor.call('RemoveFile', id, (err:boolean) => {
            if (err) {
                console.log(err);
            } else {
                const arquivos = self.state.arquivos.filter(item => {
                    return item._id !== id;
                });
                self.onChange(arquivos);
                self.setState({arquivos}, () => {
                    return self.mostrarLinksArquivos(arquivos);
                });
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
            const uploadInstance = attachmentsCollection.attachments.insert({
                file,
                meta: {
                    fieldName: this.props.name,
                    docId: doc._id || 'Error',
                    userId: Meteor.userId(), // Optional, used to check on server for file tampering
                },
                streams: 'dynamic',
                chunkSize: 'dynamic',
                allowWebWorkers: true, // If you see issues with uploads, change this to false
            }, false);

            this.currentFileUpload = fileUpload.index;

            self.setState({
                msgError: null,
                uploading: uploadInstance, // Keep track of this instance to use below
                inProgress: true, // Show the progress bar now
            });

            // These are the event functions, don't need most of them, it shows where we are in the process
            uploadInstance.on('start', () => {
                 // console.log('Starting');
            });

            uploadInstance.on('end', () => {
                 // console.log('End');
                self.setState({
                    progress: 0,
                });
            });

            uploadInstance.on('uploaded', (error:string|null, fileObj:any):void => {

                if(error){
                    console.log(error)
                }

                const attachs = [];
                let hasInsertedOjb = false;
                attachmentsCollection.attachments.find({
                    'meta.docId': self.props.doc._id,
                    'meta.fieldName': self.props.name,
                }).fetch().forEach((file:any) => {
                    attachs.push({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        link: file.link ? file.link() : null,
                        isAudio: file.isAudio,
                        isText: file.isText,
                        isJSON: file.isJSON,
                        isPDF: file.isPDF,
                        isVideo: file.isVideo,
                    });
                    if (file._id === fileObj._id) {
                        hasInsertedOjb = true;
                    }
                });


                if (!hasInsertedOjb) {
                    // const fileInsert = attachmentsCollection.attachments.findOne({ _id: fileObj._id });
                    attachs.push({
                        name: fileObj.name,
                        size: fileObj.size,
                        type: fileObj.type,
                        isAudio: fileObj.isAudio,
                        isText: fileObj.isText,
                        isJSON: fileObj.isJSON,
                        isPDF: fileObj.isPDF,
                        isVideo: fileObj.isVideo,
                    });
                }

                const newFileQueue = self.fileQueue;

                newFileQueue.shift(); // Remove Actual File Upload

                // console.log('newFileQueue.length',newFileQueue.length)

                if (newFileQueue.length > 0) {
                    const nextFile = newFileQueue[0];
                    self.uploadIt(null, nextFile);
                } else {
                    // console.log('attachs',attachs)
                    self.onChange(attachs);
                    // Remove the filename from the upload box
                    const refsName:string = 'fileinput' + this.props.name + this.props.key;

                    if (this[refsName]) {
                        this[refsName].value = '';
                    } else {
                        console.log('refsName not found', refsName);
                    }


                    // console.log('refsName',refsName);
                    // console.log('self.refs',Object.keys(self.refs));
                    //
                    // self.refs[ refsName ].value = '';

                    // Reset our state for the next file
                    self.setState({
                        uploading: [],
                        progress: 0,
                        inProgress: false,
                    });
                }
            });

            uploadInstance.on('error', (error:string) => {
                console.log(`Error during upload: ${error}`);
            });

            uploadInstance.on('progress', (progress:number, fileObj:IArquivo) => {
                const uploadSize = (Number(progress) / 100) * fileObj.size;
                // Update our progress bar
                self.setState({
                    uploadFileSize: `${getFileSize(uploadSize)}/${getFileSize(fileObj.size)}`,
                    progress,
                    uploadFileMimeType: fileObj['mime-type'],
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
            <div key={this.props.name} style={{...uploadFilesStyle.containerUploadFiles, backgroundColor:this.props.error?'#FFF6F6':undefined}}>
                <SimpleLabelView label={this.props.label}/>
                {this.props.readOnly?(this.getListReadOnly()):(
                    <div style={uploadFilesStyle.containerShowFiles}>
                        <div style={uploadFilesStyle.subContainerShowFiles}>
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
                                ref={(fileInputRef => this['fileinput' + this.props.name + this.props.key] = fileInputRef)}
                            >
                                {({getRootProps, getInputProps, isDragActive, isDragReject}) => (

                                    <div style={{
                                        ...uploadFilesStyle.containerGetConteudoDropzone,
                                        border:
                                            isDragReject? '0.5px dashed  red' :
                                                isDragActive ? '0.5px dashed green' : '0.5px dashed black',

                                    }}>
                                        <div/>
                                        {this.state.inProgress
                                            ? this.getConteudoDropzoneEmUpload()
                                            : this.getConteudoDropzone(getRootProps, getInputProps,  isDragActive, isDragReject)}
                                    </div>
                                )}

                            </Dropzone>
                        </div>
                        <div
                            col={12}
                            style={uploadFilesStyle.containerGetListFiles}
                        >
                            {this.getList()}
                        </div>
                    </div>
                )}

            </div>
        );
    }
}

UploadFile.defaultProps = {
    preventDropOnDocument: false,
    disableClick: false,
    multiple: true,
    minSize: 0,
    maxSize: 1048576 * (500), // (500MB)
    accept: '.xlsx, .xls, image/*, .doc, .docx, .ppt, .pptx, .txt, .pdf, .sql, .csv,.zip,.rar,.gz,.mp4',
    mensagens: {
        label:'Selcione ou solte seu arquivo aqui.',
        arquivosRejeitados: 'Allowed file types: xlsx, .xlsx, .xls, image/*, .doc, .docx, .ppt, .pptx, .txt, .pdf, .sql, .csv,.zip,.rar,.gz,.mp4',
        tabelaVazia:'Tabela vazia',
    },
    onChange: () => {

    },
    typeConteudo: '',
    value: [],
};

interface IUploadFilesCollection {
    preventDropOnDocument: boolean;
    name:string;
    error:boolean;
    disableClick: boolean;
    multiple: boolean;
    minSize: number;
    maxSize: number;
    accept: string;
    mensagens: {
        label:string,
        arquivosRejeitados:string,
        tabelaVazia:string,
    };
    onChange: (x:any) => any;
    saveOnChange: (doc:object) => void;
    typeConteudo: string;
    value: [];
    doc?:{_id: number};
    label?:string;
    readOnly?:boolean;
    activeStyle:object;
    activeClassName:string;
}

const UploadFilesCollection = withTracker((props:IUploadFilesCollection) => {
    const doc = typeof props.doc === 'function' ? props.doc() : props.doc;
    const handleAttachments = Meteor.subscribe('files-attachments', {
        'meta.docId': doc ? doc._id : 'No-ID',
    });
    const loading = !handleAttachments.ready();
    const attachments = attachmentsCollection.find({
        'meta.docId': doc ? doc._id || 'No-ID' : 'No-ID',
        'meta.fieldName': props.name ? props.name || 'No-FieldName' : 'No-FieldName',
    }).fetch();
    const attachmentsExists = !loading && !!attachments;

    return {
        loading,
        attachments,
        attachmentsExists,
        ...props,
    };
})(UploadFile);

export default UploadFilesCollection;
