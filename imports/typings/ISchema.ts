import { IDoc } from './IDoc';

export type LabelValue = {
    value: string | number | boolean;
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
    isImage?: boolean;
    defaultSize?: IDefaultSize;
    isAvatar?: boolean;
    isUpload?: boolean;
    multiple?: boolean;
    options?: string[] | LabelValue[];
    readOnly?: boolean;
}

// @ts-ignore
export interface ISchema<T extends IDoc> {
    [key: string]: IDefField<T>;
}
