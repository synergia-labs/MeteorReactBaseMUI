import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SysFormContext } from "../../sysForm/sysForm";
import { ISysFormComponentRef } from "../../sysForm/typings";
import { useDropzone } from "react-dropzone";
import { acceptableMimeType, FilesViewType, MimeType } from "./acceptableTypes";

import { SysFormComponentType } from "../../InterfaceBaseSimpleFormComponent";
import { produce } from "immer";

import AddIcon from "@mui/icons-material/Add";
import Styles from "./sysUploadFileStyle";
import { FormControl, SxProps, Theme } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import SysLabelView from "../../sysLabelView/sysLabelView";
import FilesView from "./typesView/filesView";
import { ISxMapTypesView } from "./typesView/interfaces";
import { IFile } from "./typesView/cards/interfaces";
import { getTypeOfFile } from "./typesView/utils";
import { hasValue } from "/imports/libs/hasValue";
import { ArchiveType } from "../../../types/archive";

interface ISysUploadFile extends SysFormComponentType<BoxProps> {
	name: string;
	label?: string;
	viewType?: FilesViewType;
	mainText?: string;
	onDropText?: string;
	buttonText?: string;
	files?: Array<IFile>;
	multiple?: boolean;
	readOnly?: boolean;
	disabled?: boolean;
	loading?: boolean;
	acceptTypes?: Array<MimeType>;
	onChange?: (files: Array<IFile>) => void;
	sxMap?: {
		container?: SxProps<Theme>;
		cards?: ISxMapTypesView;
		dropzone?: {
			container?: SxProps<Theme>;
			button?: SxProps<Theme>;
			text?: SxProps<Theme>;
			buttonText?: SxProps<Theme>;
		};
	};
}

export default function SysUploadFile({
	name,
	files = [],
	loading = false,
	multiple = false,
	readOnly = false,
	disabled = false,
	viewType = "grid",
	mainText = "Arraste ou clique aqui para adicionar arquivos",
	onDropText = "Soltar",
	buttonText = "Adicionar",
	acceptTypes,
	label,
	sxMap,
	showLabelAdornment,
	labelAdornment,
	showTooltip,
	tooltipMessage,
	tooltipPosition
}: ISysUploadFile) {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = inSysFormContext ? useRef<ISysFormComponentRef>({ name, value: files }) : null;
	const schema = refObject?.current.schema;
	let file: IFile[] = [];

	if (refObject?.current) {
		try {
			file = refObject.current.value ? [...refObject.current.value] : [];
		} catch (e) {
			console.warn("Proxy revogado em refObject.current.value", e);
			file = [];
		}
	}

	if (!file.length && schema?.defaultValue) {
		try {
			file = [...schema.defaultValue];
		} catch (e) {
			console.warn("Proxy revogado em schema.defaultValue", e);
			file = [];
		}
	}

	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);

	label = label || schema?.label;
	multiple = multiple || Array.isArray(schema?.type);
	showLabelAdornment = showLabelAdornment ?? (!!schema && !!schema?.optional);
	readOnly = readOnly || controllerSysForm.mode === "view" || !!schema?.readOnly;
	acceptTypes = (acceptTypes || schema?.acceptTypes) ?? acceptableMimeType;
	loading = loading || controllerSysForm.loading;

	const [filesState, setFilesState] = useState<Array<IFile>>(file);
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>();

	useEffect(() => {
		if (readOnly) return;
		setFilesState((old) => {
			const filtered = old.filter((item) => hasValue(item) && (hasValue(item.file) || hasValue(item.url)));
			if (inSysFormContext) {
				controllerSysForm.onChangeComponentValue({
					refComponent: refObject!,
					value: multiple ? filtered : filtered.length > 0 ? filtered[0] : []
				});
			}
			return [...filtered];
		});
	}, [readOnly, inSysFormContext, controllerSysForm, refObject, multiple]);

	function mapperSysForm(files: Array<IFile> | IFile): Promise<ArchiveType | ArchiveType[]> | Array<IFile> | IFile {
		if (!hasValue(files)) return files;
		return new Promise((resolve) => {
			if (!Array.isArray(files)) files = [files as IFile];

			// Converte os arquivos em uma lista de Promises para ler os conteúdos
			const filePromises = files
				.filter((file) => hasValue(file.alt) && hasValue(file.file))
				.map((file) => {
					return new Promise<ArchiveType>((resolveFile) => {
						const reader = new FileReader();
						reader.onload = () => {
							if (typeof reader.result === "string") {
								resolveFile({
									alt: file.alt!,
									name: file.file!.name,
									type: file.file!.type,
									size: file.file!.size,
									content: reader.result.split(",")[1] // Remove o prefixo "data:image/png;base64,"
								});
							}
						};
						reader.readAsDataURL(file.file!);
					});
				});

			// Aguarda todas as leituras dos arquivos antes de retornar os dados
			Promise.all(filePromises).then((archives) => {
				resolve(!multiple && archives.length > 0 ? archives[0] : archives);
			});
		});
	}

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setFilesState([]),
			setErrorMethod: (error) => setErrorState(error),
			setValueMethod: (value: Array<IFile>) => setFilesState(Array.isArray(value) ? value : [value]),
			changeVisibilityMethod: (visible) => setVisibleState(visible),
			mapperSysForm: mapperSysForm
		});

	const onDrop = useCallback(
		(acceptedFiles: Array<File>) => {
			const newFiles = [
				...(multiple ? filesState : []),
				...acceptedFiles.map((item) => ({
					file: item,
					url: "",
					type: getTypeOfFile(item.type ?? ""),
					alt: item.name ?? ""
				}))
			];

			setFilesState(newFiles);
			if (inSysFormContext)
				controllerSysForm.onChangeComponentValue({
					refComponent: refObject!,
					value: multiple ? newFiles : newFiles[0]
				});
		},
		[files]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { ...acceptTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}) },
		disabled: disabled || readOnly || !visibleState,
		multiple: multiple,
		maxSize: 15 * 1024 * 1024, // 15MB
		onError: (error) => {
			setErrorState(error.message);
		}
	});

	function remove(index: number) {
		setFilesState((old) =>
			produce(old, (draft) => {
				draft.splice(index, 1);
				if (inSysFormContext)
					controllerSysForm.onChangeComponentValue({
						refComponent: refObject!,
						value: multiple ? draft : draft[0]
					});
			})
		);
	}

	return (
		<Box sx={{ position: "relative" }}>
			<FormControl error={!!errorState}>
				<SysLabelView
					label={label}
					showLabelAdornment={showLabelAdornment}
					labelAdornment={labelAdornment}
					disabled={disabled}
					showTooltip={showTooltip}
					tooltipMessage={tooltipMessage}
					tooltipPosition={tooltipPosition}>
					<Styles.container sx={sxMap?.container}>
						{!multiple && filesState.length > 0 ? (
							<></>
						) : (
							<Styles.button variant="text" {...getRootProps()} disabled={disabled} sx={sxMap?.dropzone?.container}>
								<input {...getInputProps()} />
								<Styles.typographyInfo variant={!isDragActive ? "caption" : "subtitle1"} sx={sxMap?.dropzone?.text}>
									{isDragActive ? onDropText : mainText}
								</Styles.typographyInfo>
								{!isDragActive && (
									<Styles.typographyAdd variant="button2" sx={sxMap?.dropzone?.buttonText}>
										<AddIcon />
										{buttonText}
									</Styles.typographyAdd>
								)}
							</Styles.button>
						)}
						{filesState.length > 0 && (
							<FilesView
								files={filesState}
								canEdit={!readOnly}
								viewType={viewType}
								sxMap={sxMap?.cards}
								onRemove={remove}
								isMultiple={multiple}
							/>
						)}
					</Styles.container>
				</SysLabelView>
			</FormControl>
			{loading && <Styles.loadingContainer />}
		</Box>
	);
}
