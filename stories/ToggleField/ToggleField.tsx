import React from 'react';


import ToggleFieldComp from '/imports/ui/components/SimpleFormFields/ToggleField/ToggleField';

export interface ToggleFieldProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  backgroundColor?: string;
  color?: string;
}

/**
 * Primary UI component for user interaction
 */
export const ToggleField: React.FC<ToggleFieldProps> = ({
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
    <ToggleFieldComp
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
