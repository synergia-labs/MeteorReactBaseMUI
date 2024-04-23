import { IOption } from '../ui/components/InterfaceBaseSimpleFormComponent';
import { IDoc } from './IDoc';

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
	subSchema?: ISchema<any>;
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
}

export interface ISchema<T extends IDoc> {
	[key: string]: IDefField<T>;
}
