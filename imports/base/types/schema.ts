import { IOption } from "/imports/ui/components/InterfaceBaseSimpleFormComponent";

export type LabelValue = {
	value: any;
	label: string;
};

export type IDefaultSize = {
	width?: number;
	height?: number;
};

export interface IDefField<C> {
	type: any;
	label?: string;
	defaultValue?: any;
	optional?: boolean;
	mask?: string;
	subSchema?: SchemaType<any>;
	visibilityFunction?: (doc: C) => boolean;
	validationFunction?: (value: any, doc?: C) => string | undefined;
	isImage?: boolean;
	defaultSize?: IDefaultSize;
	isAvatar?: boolean;
	isUpload?: boolean;
	multiple?: boolean;
	options?: (doc?: C) => Array<IOption>;
	readOnly?: boolean;
	isAudio?: boolean;
	isMapLocation?: boolean;
	max?: number;
	min?: number;
	radiosList?: Array<string>;
	acceptTypes?: MimeType[];
}

export interface SchemaType<T> {
	[key: string]: IDefField<T>;
}
