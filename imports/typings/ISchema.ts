import { IDoc } from "../api/IDoc";

export type LabelValue = {
  value: string | number;
  label: string;
};

interface IDefField<C> {
  type: object;
  label?: string;
  defaultValue?: any;
  optional?: boolean;
  mask?: string;
  subSchema?: ISchema<any>;
  visibilityFunction?: (doc: C) => boolean;
  isImage?: boolean;
  isUpload?: boolean;
  multiple?: boolean;
  options?: string[] | LabelValue[];
}

// @ts-ignore
export interface ISchema<T extends IDoc> {
  [key: string]: IDefField<T>;
}
