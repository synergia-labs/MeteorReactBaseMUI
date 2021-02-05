import React from 'react';


import TextMaskFieldComp from '/imports/ui/components/SimpleFormFields/TextMaskField/TextMaskField';

export interface TextMaskFieldProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  backgroundColor?: string;
}

/**
 * TextMaskField é responsável por fazer o mask de campos de texto, como cpf e telefone.
 * 
 * Schema:
 * 
 *  contacts: {
    type: Object,
    label: 'Contatos',
    defaultValue: '',
    optional: false,
    subSchema: {
      phone: {
        type: String,
        label: 'Telefone',
        defaultValue: '',
        optional: false,
        mask : '(##) ####-####',
      },
      cpf: {
        type: String,
        label: 'CPF',
        defaultValue: '',
        optional: false,
        mask : '###.###.###-##',
      },
    }
  },
 */
export const TextMaskField: React.FC<TextMaskFieldProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  password=false,
  backgroundColor,
  ...props
}) => {

  return (
    <TextMaskFieldComp
      placeholder={placeholder}
      label={name}
      disabled={disabled}
      required={required}
      style={{ backgroundColor }}
      {...props}
    />
  );
};
