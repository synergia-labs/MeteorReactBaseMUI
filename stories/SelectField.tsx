import React from 'react';
import './button.css';

import SelectFieldComp from '/imports/ui/components/SimpleFormFields/SelectField/SelectField';

export interface SelectFieldProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  options: [Object];
  backgroundColor?: string;
  color?: string;
}

/**
 * Primary UI component for user interaction
 */
export const SelectField: React.FC<SelectFieldProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  options=[],
  backgroundColor,
  color,
  ...props
}) => {

  return (
    <SelectFieldComp
      placeholder={placeholder}
      label={name}
      disabled={disabled}
      required={required}
      options={options}
      style={{ backgroundColor, color }}
      {...props}
    />
  );
};
