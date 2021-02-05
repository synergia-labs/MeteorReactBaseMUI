import React from 'react';


import TextFieldComp from '/imports/ui/components/SimpleFormFields/TextField/TextField';

export interface TextFieldProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  password?: boolean;
  backgroundColor?: string;
}

/**
 * TextField é utilizado para receber campos de texto do usuário.
 *
 * Schema:
 *
 *  title: {
    type: String,
    label: 'Título',
    defaultValue: '',
    optional: false,
  },
  description: {
    type: String,
    label: 'Descrição',
    defaultValue: '',
    optional: true,
  },
 */
export const TextField: React.FC<TextFieldProps> = ({
  placeholder='',
  name='',
  disabled=false,
  required=false,
  password=false,
  backgroundColor,
  ...props
}) => {

  const type = password ? "password" : "";

  return (
    <TextFieldComp
      placeholder={placeholder}
      label={name}
      type={type}
      disabled={disabled}
      required={required}
      style={{ backgroundColor }}
      {...props}
    />
  );
};
