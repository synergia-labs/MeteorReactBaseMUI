import { AuditType } from "./audit";
import { IOption } from "/imports/ui/components/InterfaceBaseSimpleFormComponent";

export type LabelValueType = {
	value: any;
	label: string;
};

export type DefaultSizeType = {
	width?: number;
	height?: number;
};

export interface IDefField<C> {
	type: any;
	label?: string;
	defaultValue?: any;
	optional?: boolean;
	mask?: string;
	subSchema?: ISchema<any>;
	visibilityFunction?: (doc: C) => boolean;
	validationFunction?: (value: any, doc?: C) => string | undefined;
	isImage?: boolean;
	defaultSize?: DefaultSizeType;
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

export interface ISchema<T extends AuditType> {
	[key: string]: IDefField<T>;
}
