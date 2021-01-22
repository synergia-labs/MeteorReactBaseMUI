import React from 'react';
import './button.css';

import TextFieldComp from '/imports/ui/components/SimpleFormFields/TextField/TextField';

export interface TextFieldProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  type?:string;
}

/**
 * Primary UI component for user interaction
 */
export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  type,
  ...props
}) => {
  return (
    <TextFieldComp
      {...props}
    />
  );
};
