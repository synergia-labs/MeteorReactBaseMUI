import React from 'react';

import DatePickerFieldComp from '/imports/ui/components/SimpleFormFields/DatePickerField/DatePickerField';

export interface DatePickerFieldProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  type?:string;
}
/**
 * DatePickerField é utilizado para a seleção de datas.
 * 
 * Schema:
 * 
 *  date: {
    type: Date,
    label: 'Data',
    defaultValue: '',
    optional: true,
  },
 */
export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  type,
  ...props
}) => {
  return (
    <DatePickerFieldComp
      name={name}
      type={type}
      {...props}
    />
  );
};
