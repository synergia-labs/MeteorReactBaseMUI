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
 * Primary UI component for user interaction
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
