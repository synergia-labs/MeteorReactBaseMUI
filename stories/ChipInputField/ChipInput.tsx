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
 * Primary UI component for user interaction
 */
export const ChipInput: React.FC<ChipInputProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
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
