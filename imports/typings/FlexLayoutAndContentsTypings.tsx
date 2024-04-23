import { Ref } from 'react';
import { IConteudo } from '../modules/conteudo/api/conteudoSch';

export interface IContentType {
	type:
		| 'image'
		| 'richtext'
		| 'titulo'
		| 'legenda'
		| 'citacao'
		| 'destaque'
		| 'sobreAutor'
		| 'sobreInstituicao'
		| 'hyperlink'
		| 'lista'
		| 'template'
		| 'video'
		| 'file'
		| 'blockedcontent'
		| 'link'
		| 'row'
		| 'col';
}

export interface IContentComponent {
	refComponent?: Ref<any>;
	name: string;
	data?: IContentData;
	readOnly: boolean;
	onCloseEdit: () => void;
	onChange: (
		evt?: React.ChangeEvent<HTMLInputElement>,
		others?: { name?: string; value: { text?: any; html: string } }
	) => void;
	onEdit?: () => void;
	placeholder?: string;
	selectedGrid?: ISelectedGrid;
	gridContainerRef?: React.MutableRefObject<any>;
	metaContent: Partial<IConteudo>;
}

export interface IContent extends IContentType {
	viewComponent: (props: IContentComponent) => JSX.Element;
	editComponent: (props: IContentComponent) => JSX.Element;
	componentMenu?: (props: IContentComponent) => JSX.Element;
	componentStyle?: ((props: IContentComponent) => JSX.Element) | null;
	setInitialValue: (item: any) => any;
	label: string;
}

export interface IContentLayout {
	contentType: string;
	i: string;
	order: number;
	gridStyle?: {
		alingItems?: string;
		justifyContent?: string;
		maxWidth?: string;
		maxHeight?: any;
		alignItems?: any;
		border?: any;
		backgroundColor?: any;
		opacity?: any;
		filter?: any;
		'object-fit'?: any;
		color?: any;
		variant?: any;
		size?: any;
		justify?: any;
		flexWrap?: any;
	};
	parent: string | null;
}

export interface IContentGridType {
	video?: string;
	template?: string;
	richtext?: string;
	image?: string;
	url?: { link?: string; linkName?: string };
}

export interface ISelectedGrid extends IContentGridType {
	contentType: IContentType['type'];
	i: string;
	layout: IContentLayout;
	name: string;
	gridStyle?: IContentLayout['gridStyle'];
	style?: IContentLayout['gridStyle'];
	value?: any;
	textContent?: string;
	classe?: string;
	nomeAutor?: string;
	nomeInstituicao?: string;
}

export interface IContentData {
	contentType: IContentType['type']; //| "row" | "column";
	i: string;
	name: string;
	value?: any;
	textContent?: string;
	style?: IContentLayout['gridStyle'];
	image?: string;
	classe?: string;
	nomeAutor?: string;
	nomeInstituicao?: string;
	numColumns?: number;
}

export interface IContentDataLayout {
	contentData: Array<IContentData>;
	layout: { desktop: Array<IContentLayout>; mobile: Array<IContentLayout> };
}

export interface IFlexGridContainer {
	content: IContentDataLayout;
	mode: string;
	isMobileView: boolean;
	setSelectedGrid: React.Dispatch<React.SetStateAction<any>>;
	gridOptions: { margin: Array<string | number> | undefined };
	onSave: ({}: IContentDataLayout) => void;
	refComponent: React.MutableRefObject<any>;
	selectedGrid: ISelectedGrid | null;
	paletteMode?: string;
	setSalvo: (option: boolean) => void;
	isRascunho: boolean;
}

export interface IScreenEditorTopToolbar {
	editMode: string;
	setEditMode: React.Dispatch<React.SetStateAction<string>>;
	templates: any;
	saveTeplate: () => void;
	selectedTemplate: null | string;
	setSelectedTemplate: (data: any) => void;
	isMobileView: boolean;
	setIsMobileView: (data: boolean) => void;
	zoom: number;
	setZoom: React.Dispatch<React.SetStateAction<any>>;
	mobileSize: string;
	setMobileSize: React.Dispatch<React.SetStateAction<any>>;
	gridContainerRef: React.MutableRefObject<any>;
	setGridOptions: (options: any) => void;
	gridOptions: IFlexGridContainer['gridOptions'];
	selectParent: () => void;
	setSelectedGrid: React.Dispatch<React.SetStateAction<any>>;
	selectedGrid: any;
	paletteMode: any;
	theme: any;
	salvo: boolean;
	conteudo: IConteudo;
}
