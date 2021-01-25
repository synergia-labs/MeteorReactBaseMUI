import React from 'react';
import './button.css';

import RadioFieldComp from '/imports/ui/components/SimpleFormFields/RadioButtonField/RadioButtonField';

export interface RadioFieldProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  radiosList: [Object];
}

/**
 * Primary UI component for user interaction
 */
export const RadioField: React.FC<RadioFieldProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  radiosList=[],
  ...props
}) => {

  return (
    <RadioFieldComp
      placeholder={placeholder}
      label={name}
      disabled={disabled}
      required={required}
      radiosList={radiosList}
      {...props}
    />
  );
};
