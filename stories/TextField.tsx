import React from 'react';
import './button.css';

import TextFieldComp from '/imports/ui/components/SimpleFormFields/TextField/TextField';

export interface TextFieldProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  password?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  password=false,
  ...props
}) => {

  const type = password ? "password" : "";

  return (
    <TextFieldComp
      placeholder={placeholder}
      name={name}
      type={type}
      disabled={disabled}
      required={required}
      {...props}
    />
  );
};
