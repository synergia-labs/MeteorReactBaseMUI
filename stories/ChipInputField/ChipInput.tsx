import React from 'react';


import ChipInputComp from '/imports/ui/components/SimpleFormFields/ChipInput/ChipInput';

export interface ChipInputProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  type?:string;
}
/**
 * ChipInput é utilizado na criação de chips de informação.
 * 
 * Schema:
 * 
 * chip: {
    type: [String],
    label: 'Chips',
    defaultValue: '',
    optional: true,
  },
 */
export const ChipInput: React.FC<ChipInputProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  chip=['Chip'],
  type,
  ...props
}) => {
  return (
    <ChipInputComp
      name={name}
      type={type}
      {...props}
    />
  );
};
