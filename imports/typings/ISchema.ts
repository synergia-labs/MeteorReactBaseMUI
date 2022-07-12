import { IDoc } from "./IDoc";

export type LabelValue = {
  value: string | number;
  label: string;
};

interface IDefField<C> {
  type: any;
  label?: string;
  defaultValue?: any;
  optional?: boolean;
  mask?: string;
  subSchema?: ISchema<any>;
  visibilityFunction?: (doc: C) => boolean;
  isImage?: boolean;
  isAvatar?: boolean;
  isUpload?: boolean;
  multiple?: boolean;
  options?: string[] | LabelValue[];
}

// @ts-ignore
export interface ISchema<T extends IDoc> {
  [key: string]: IDefField<T>;
}
