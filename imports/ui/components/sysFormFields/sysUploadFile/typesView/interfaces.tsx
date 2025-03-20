import { FilesViewType } from "../acceptableTypes";
import { SxProps, Theme } from "@mui/material";
import { IFile } from "./cards/interfaces";

export interface ITypesView {
	files: Array<IFile>;
	viewType?: FilesViewType;
	canEdit?: boolean;
	sxMap?: ISxMapTypesView;
	onRemove: (idx: number) => void;
}

export interface ISxMapTypesView {
	card?: SxProps<Theme>;
	boxIcon?: SxProps<Theme>;
	icon?: SxProps<Theme>;
	title?: SxProps<Theme>;
	subtitle?: SxProps<Theme>;
}
