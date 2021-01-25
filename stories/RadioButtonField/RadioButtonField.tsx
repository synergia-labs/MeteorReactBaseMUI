import React from 'react';


import RadioFieldComp from '/imports/ui/components/SimpleFormFields/RadioButtonField/RadioButtonField';

export interface RadioButtonFieldProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  radiosList: [Object];
}

/**
 * Primary UI component for user interaction
 */
export const RadioButtonField: React.FC<RadioButtonFieldProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  radiosList=['Todo', 'Doing', 'Done'],
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
