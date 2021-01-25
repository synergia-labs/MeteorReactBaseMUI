import React from 'react';

import SimpleFormComp from '/imports/ui/components/SimpleForm/SimpleForm';

export interface SimpleFormProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  password?: boolean;
  backgroundColor?: string;
}

/**
 * Primary UI component for user interaction
 */
export const SimpleForm: React.FC<SimpleFormProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  password=false,
  backgroundColor,
  ...props
}) => {

  const type = password ? "password" : "";

  return (
    <SimpleFormComp
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
