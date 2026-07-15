import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import MuiButton from '@mui/material/Button';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { attachmentsCollection } from '../../../../api/attachmentsCollection';
import { SysFormContext } from '../../sysForm/sysForm';
import { hasValue } from '../../../../libs/hasValue';
import { ISysFormComponentRef } from '../../sysForm/typings';
import { ISysFormComponent } from '../../InterfaceBaseSimpleFormComponent';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SysLabelView from '../../sysLabelView/sysLabelView';
import SysUploadFileStyle from './sysUploadFileStyle';
import { SxProps, Theme } from '@mui/material';
import { SysLoading } from '../../sysLoading/sysLoading';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import SysIcon from '../../../../ui/components/sysIcon/sysIcon';
import AppLayoutContext, { IAppLayoutContext } from '/imports/app/appLayoutProvider/appLayoutContext';

const { BoxItem, BoxIcon, BoxIconsCard, CardInfo, TypographyInfo, TypographyAdd, ElipsesText, Container, Button } =
	SysUploadFileStyle;

interface IArquivo {
	name: string;
	type: string;
	size: number;
	_id?: string;
	_downloadRoute?: string;
	_collectionName?: string;
}

interface ISysUploadFile extends ISysFormComponent<any> {
	validTypes?: ('text' | 'audio' | 'image' | 'video' | 'application' | string)[];
	sxMap?: {
		container?: SxProps<Theme>;
		button?: SxProps<Theme>;
		itenList?: SxProps<Theme>;
		boxItem?: SxProps<Theme>;
		boxIcon?: SxProps<Theme>;
		cardInfo?: SxProps<Theme>;
		cardTitle?: SxProps<Theme>;
		cardDesc?: SxProps<Theme>;
		boxIconsCard?: SxProps<Theme>;
	};
	btnTextDesc?: string;
	enableAudioRecording?: boolean;
	moduleName?: string;
}

export const SysUploadFile: React.FC<ISysUploadFile> = ({
	name,
	label,
	value,
	defaultValue,
	disabled,
	loading,
	readOnly,
	error,
	showLabelAdornment,
	labelAdornment,
	showTooltip,
	tooltipMessage,
	tooltipPosition,
	sxMap,
	btnTextDesc = 'Arraste o arquivo até aqui ou clique abaixo',
	enableAudioRecording = false,
	moduleName,
	validTypes = ['text', 'audio', 'image', 'video', 'application'] // Caso queira adicionar outras extensoes, adicione tambem ao arquivo attachment Collection.js
}) => {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const [files, setFiles] = useState<IArquivo[]>(value || defaultValue || []);
	const recorderRef = useRef<MediaRecorder | null>(null);
	const streamRef = useRef<MediaStream | null>(null);
	const chunksRef = useRef<Blob[]>([]);
	const [recording, setRecording] = useState(false);
	const { showNotification } = useContext<IAppLayoutContext>(AppLayoutContext);

	const refObject = !inSysFormContext ? null : useRef<ISysFormComponentRef>({ name, value: value || defaultValue });
	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);
	const schema = refObject?.current.schema;
	const [visibleState, setVisibleState] = React.useState<boolean>(refObject?.current.isVisible ?? true);

	const maxSize = 15 * 1024 * 1024; // 15MB

	label = label || schema?.label;
	readOnly = readOnly || controllerSysForm.mode === 'view' || schema?.readOnly;
	disabled = disabled || controllerSysForm.disabled;
	loading = loading || controllerSysForm.loading;
	showLabelAdornment = showLabelAdornment ?? (!!schema && !!schema?.optional);

	const [errorState, setErrorState] = useState<string | undefined>(typeof error === 'string' ? error : undefined);
	const [valueState, setValueState] = useState<string>(defaultValue || '');

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setValueState(''),
			setValueMethod: (value) => setValueState(value),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			setErrorMethod: (error) => setErrorState(error)
		});

	const uploadFile = useCallback(
		(file: FileWithPath | File) => {
			const type = file.type.split('/')[0];
			if (!validTypes.includes(type) || file.size > maxSize) {
				showNotification({
					type: 'error',
					title: 'Arquivo inválido',
					message: `O arquivo "${file.name}" é inválido.`
				});
				return;
			}
			const newFile: IArquivo = { name: file.name, type: file.type, size: file.size };

			const uploadInstance = attachmentsCollection.attachments.insert({
				file,
				meta: {
					...(moduleName ? { module: moduleName } : {}),
					fieldName: name,
					docId: controllerSysForm.docId || 'Error',
					kind: name === 'images' ? 'image' : name === 'audios' ? 'audio' : 'attachment',
					userId: Meteor.userId()
				},
				chunkSize: 'dynamic',
				allowWebWorkers: true
			});

			uploadInstance.on('uploaded', (error: string | null) => {
				if (error) {
					showNotification({ type: 'error', title: 'Falha no upload', message: String(error) });
					return;
				}
				setFiles((prevFiles) => [...prevFiles, newFile]);
			});
		},
		[controllerSysForm.docId, moduleName, name, showNotification, validTypes]
	);

	const toggleRecording = useCallback(async () => {
		if (recording) {
			recorderRef.current?.stop();
			setRecording(false);
			return;
		}
		try {
			if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
				throw new Error('Este navegador não oferece suporte à gravação de áudio.');
			}
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			streamRef.current = stream;
			chunksRef.current = [];
			const preferredMimeType = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg'].find((mimeType) =>
				MediaRecorder.isTypeSupported(mimeType)
			);
			const recorder = new MediaRecorder(stream, preferredMimeType ? { mimeType: preferredMimeType } : undefined);
			recorderRef.current = recorder;
			recorder.ondataavailable = (event) => {
				if (event.data.size) chunksRef.current.push(event.data);
			};
			recorder.onstop = () => {
				const mimeType = recorder.mimeType || preferredMimeType || 'audio/webm';
				const extension = mimeType.startsWith('audio/ogg') ? 'ogg' : 'webm';
				const blob = new Blob(chunksRef.current, { type: mimeType });
				uploadFile(new File([blob], `gravacao-${Date.now()}.${extension}`, { type: mimeType }));
				streamRef.current?.getTracks().forEach((track) => track.stop());
				streamRef.current = null;
			};
			recorder.start(1000);
			setRecording(true);
		} catch (error: any) {
			streamRef.current?.getTracks().forEach((track) => track.stop());
			streamRef.current = null;
			showNotification({
				type: 'error',
				title: 'Microfone indisponível',
				message: error?.message || 'Não foi possível iniciar a gravação.'
			});
		}
	}, [recording, showNotification, uploadFile]);

	useEffect(
		() => () => {
			if (recorderRef.current?.state === 'recording') {
				recorderRef.current.onstop = null;
				recorderRef.current.stop();
			}
			streamRef.current?.getTracks().forEach((track) => track.stop());
		},
		[]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: useCallback(
			(acceptedFiles: FileWithPath[]) => {
				acceptedFiles.forEach(uploadFile);
			},
			[uploadFile]
		)
	});

	const { loadingAttachments, attachments, attachmentsExists } = useTracker(() => {
		const docId = controllerSysForm.docId;
		const handleAttachments = Meteor.subscribe('files-attachments', {
			'meta.docId': docId ? docId : 'No-ID'
		});
		const loadingAttachments = !handleAttachments.ready();
		const attachments = attachmentsCollection
			.find({
				'meta.docId': docId ? docId || 'No-ID' : 'No-ID',
				'meta.fieldName': name ? name || 'No-FieldName' : 'No-FieldName'
			})
			.fetch();
		const attachmentsExists = !loadingAttachments && !!attachments;
		if (attachments.length > 0 && files.length === 0) setFiles(attachments);
		return {
			attachments,
			attachmentsExists,
			loadingAttachments
		};
	});

	const getFileUrl = (item: IArquivo) =>
		`${Meteor.absoluteUrl()}${item._downloadRoute}/${item._collectionName}/${item._id}/original/${encodeURIComponent(item.name)}`;

	const downloadURI = (item: IArquivo) => {
		const link = document.createElement('a');
		link.download = item.name;
		link.href = getFileUrl(item);
		link.click();
	};

	const deleteFile = (id: string | undefined) => {
		const method = moduleName === 'example' ? 'example.removeAsset' : 'RemoveFile';
		const argument = moduleName === 'example' ? { assetId: id } : id;
		Meteor.call(method, argument, (err: Error | undefined) => {
			if (err) {
				console.error(err);
				return;
			}
			setFiles((prevFiles) => prevFiles.filter((item) => item._id !== id));
		});
	};

	if (!visibleState) return null;

	return (
		<FormControl error={!!errorState}>
			<SysLabelView
				label={label}
				showLabelAdornment={showLabelAdornment}
				labelAdornment={labelAdornment}
				disabled={disabled}
				showTooltip={showTooltip}
				tooltipMessage={tooltipMessage}
				tooltipPosition={tooltipPosition}>
				<Container readOnly={readOnly} sx={sxMap?.container}>
					{!readOnly && (
						<>
							<Button {...getRootProps()} disabled={disabled || loading || recording} sx={sxMap?.button}>
								<input {...getInputProps()} />
								<TypographyInfo variant="caption">{btnTextDesc}</TypographyInfo>
								<TypographyAdd variant="button2">
									<SysIcon name={'add'} />
									Adicionar
								</TypographyAdd>
							</Button>
							{enableAudioRecording && (
								<MuiButton
									type="button"
									variant={recording ? 'contained' : 'outlined'}
									onClick={toggleRecording}
									disabled={disabled || loading}
									sx={{ mt: 1 }}>
									{recording ? 'Parar e anexar gravação' : 'Gravar áudio pelo microfone'}
								</MuiButton>
							)}
						</>
					)}

					{loadingAttachments && <SysLoading />}
					{attachments.length > 0 ? (
						<SysUploadFileStyle.itenList sx={sxMap?.itenList}>
							{attachments.map((item: IArquivo) => (
								<BoxItem key={item._id} sx={sxMap?.boxItem}>
									<BoxIcon sx={sxMap?.boxIcon}>
										{item.type?.startsWith('image/') && item._id ? (
											<img
												alt={item.name}
												src={getFileUrl(item)}
												style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
											/>
										) : (
											getIcon(item.type)
										)}
									</BoxIcon>

									<CardInfo sx={sxMap?.cardInfo}>
										<ElipsesText variant="body2" sx={sxMap?.cardTitle}>
											{item.name}
										</ElipsesText>
										<Typography variant="caption" sx={sxMap?.cardDesc}>
											{Math.max(1, Math.round(item.size / 1024))} KB
										</Typography>
										{item.type?.startsWith('audio/') && item._id && (
											<audio controls preload="metadata" src={getFileUrl(item)} style={{ maxWidth: '100%' }} />
										)}
									</CardInfo>

									<BoxIconsCard sx={sxMap?.boxIconsCard}>
										<SysIcon
											name={'delete'}
											color="primary"
											sx={{ cursor: 'pointer', display: readOnly ? 'none' : 'block' }}
											onClick={() => deleteFile(item._id)}
										/>
										<SysIcon
											name={'download'}
											color="primary"
											onClick={() => downloadURI(item)}
											sx={{ cursor: 'pointer', display: readOnly ? 'block' : 'none' }}
										/>
									</BoxIconsCard>
								</BoxItem>
							))}
						</SysUploadFileStyle.itenList>
					) : (
						<Typography variant="body1" sx={{ display: readOnly ? 'block' : 'none' }}>
							Sem Arquivos
						</Typography>
					)}
				</Container>
			</SysLabelView>
			{!!errorState && <FormHelperText>{errorState}</FormHelperText>}
		</FormControl>
	);
};

function getIcon(mimeType: string) {
	const type = mimeType.split('/')[0];
	switch (type) {
		case 'text':
			return <SysIcon name={'bookLibrary'} color="primary" />;
		case 'audio':
			return <SysIcon name={'musicLibrary'} color="primary" />;
		case 'image':
			return <SysIcon name={'image'} color="primary" />;
		case 'video':
			return <SysIcon name={'videoLibrary'} color="primary" />;
		case 'application':
			return <SysIcon name={'book'} color="primary" />;
		default:
			return <SysIcon name={'attachFile'} color="primary" />;
	}
}
