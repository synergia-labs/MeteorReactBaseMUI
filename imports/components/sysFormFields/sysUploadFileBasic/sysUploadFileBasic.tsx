import React, { useCallback, useContext, useRef, useState } from "react";
import { SysFormContext } from "../../sysForm/sysForm";
import { hasValue } from "/imports/libs/hasValue";
import { ISysFormComponentRef } from "../../sysForm/typings";
import { useDropzone } from "react-dropzone";
import { acceptableMimeType, MimeType } from "./acceptableTypes";
import { produce } from "immer";
import LibraryBooks from "@mui/icons-material/LibraryBooks";
import LibraryMusic from "@mui/icons-material/LibraryMusic";
import VideoLibrary from "@mui/icons-material/VideoLibrary";
import AttachFile from "@mui/icons-material/AttachFile";
import Book from "@mui/icons-material/Book";
import Image from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import Styles from "./sysUploadFileBasicStyle";
import { Box, FormControl, SxProps, Theme, Typography } from "@mui/material";
import SysLabelView from "../../sysLabelView/sysLabelView";
import DeleteIcon from "@mui/icons-material/Delete";

interface ISysUploadFileBasic {
	name: string;
	label?: string;
	mainText?: string;
	onDropText?: string;
	buttonText?: string;
	files?: Array<File>;
	multiple?: boolean;
	readOnly?: boolean;
	required?: boolean;
	disabled?: boolean;
	showLabelAdornment?: boolean;
	loading?: boolean;
	acceptTypes?: Array<MimeType>;
	onChange?: (files: Array<File>) => void;
	sxMap?: {
		container?: SxProps<Theme>;
		button?: SxProps<Theme>;
		boxItem?: SxProps<Theme>;
		boxIcon?: SxProps<Theme>;
		cardInfo?: SxProps<Theme>;
		cardTitle?: SxProps<Theme>;
		cardDesc?: SxProps<Theme>;
		boxIconsCard?: SxProps<Theme>;
	};
}

export default function SysUploadFileBasic({
	name,
	files = [],
	loading = false,
	multiple = false,
	readOnly = false,
	required = false,
	disabled = false,
	showLabelAdornment = true,
	mainText = "Arraste ou clique aqui para adicionar arquivos",
	onDropText = "Soltar",
	buttonText = "Adicionar",
	acceptTypes = acceptableMimeType,
	label,
	sxMap
}: ISysUploadFileBasic) {
	const controllerSysForm = useContext(SysFormContext);
	const inSysFormContext = hasValue(controllerSysForm);

	const refObject = inSysFormContext ? useRef<ISysFormComponentRef>({ name, value: files }) : null;
	if (inSysFormContext) controllerSysForm.setRefComponent(refObject!);
	const schema = refObject?.current.schema;

	label = label || schema?.label;
	required = required || !!!schema?.optional;
	readOnly = readOnly || controllerSysForm.mode === "view" || !!schema?.readOnly;
	multiple = multiple || Array.isArray(schema?.type);
	loading = loading || controllerSysForm.loading;

	const file = refObject?.current.value || schema?.defaultValue;
	const [filesState, setFilesState] = useState<Array<File>>(Array.isArray(file) ? file : [file]);
	const [visibleState, setVisibleState] = useState<boolean>(refObject?.current.isVisible ?? true);
	const [errorState, setErrorState] = useState<string | undefined>();

	if (inSysFormContext)
		controllerSysForm.setInteractiveMethods({
			componentRef: refObject!,
			clearMethod: () => setFilesState([]),
			setErrorMethod: (error) => setErrorState(error),
			setValueMethod: (value: Array<File>) => setFilesState(Array.isArray(value) ? value : [value]),
			changeVisibilityMethod: (visible) => setVisibleState(visible)
		});

	const onDrop = useCallback(
		(acceptedFiles: Array<File>) => {
			const newFiles = [...(multiple ? filesState : []), ...acceptedFiles];

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
					controllerSysForm.onChangeComponentValue({ refComponent: refObject!, value: multiple ? draft : draft[0] });
			})
		);
	}

	return (
		<Box sx={{ position: "relative" }}>
			<FormControl error={!!errorState}>
				<SysLabelView
					label={label}
					disabled={disabled}
					sxMap={sxMap}
					showLabelAdornment={!required && showLabelAdornment}>
					<Styles.container sx={sxMap?.container}>
						<Styles.button {...getRootProps()} disabled={disabled} sx={sxMap?.button}>
							<input {...getInputProps()} />
							<Styles.typographyInfo variant={!isDragActive ? "caption" : "subtitle1"}>
								{isDragActive ? onDropText : mainText}
							</Styles.typographyInfo>
							{!isDragActive && (
								<Styles.typographyAdd variant="button2">
									<AddIcon />
									{buttonText}
								</Styles.typographyAdd>
							)}
						</Styles.button>

						{filesState.map((item: File, idx: number) => (
							<Styles.boxItem key={"uploadField" + idx} sx={sxMap?.boxItem}>
								<Styles.boxIcon sx={sxMap?.boxIcon}>{getIcon(item.type)}</Styles.boxIcon>

								<Styles.cardInfo sx={sxMap?.cardInfo}>
									<Styles.elipsesText variant="body2" sx={sxMap?.cardTitle}>
										{item.name}
									</Styles.elipsesText>
									<Typography variant="caption" sx={sxMap?.cardDesc}>
										{(item.size / (1024 * 1024)).toFixed(3)}MB
									</Typography>
								</Styles.cardInfo>

								<Styles.boxIconsCard sx={sxMap?.boxIconsCard}>
									<DeleteIcon
										color="primary"
										sx={{ cursor: "pointer", display: readOnly ? "none" : "block" }}
										onClick={() => remove(idx)}
									/>
								</Styles.boxIconsCard>
							</Styles.boxItem>
						))}
					</Styles.container>
				</SysLabelView>
			</FormControl>
			{loading && (
				<Box
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						display: "flex",
						zIndex: 999,
						backgroundColor: "rgba(255,255,255,0.4)"
					}}
				/>
			)}
		</Box>
	);
}

function getIcon(mimeType: string) {
	const type = mimeType.split("/")[0];
	switch (type) {
		case "text":
			return <LibraryBooks color="primary" />;
		case "audio":
			return <LibraryMusic color="primary" />;
		case "image":
			return <Image color="primary" />;
		case "video":
			return <VideoLibrary color="primary" />;
		case "application":
			return <Book color="primary" />;
		default:
			return <AttachFile color="primary" />;
	}
}
