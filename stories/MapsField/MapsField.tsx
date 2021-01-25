import React from 'react';


import GoogleApiWrapperComp from '/imports/ui/components/SimpleFormFields/MapsField/MapsField';

export interface GoogleApiWrapperProps {
  placeholder: string;
  name: string;
  required?: boolean;
  value: [Object];
}

/**
 * Primary UI component for user interaction
 */
export const GoogleApiWrapper: React.FC<GoogleApiWrapperProps> = ({
  placeholder,
  name,
  required=false,
  value='',
  ...props
}) => {

  return (
    <GoogleApiWrapperComp
      placeholder={placeholder}
      label={name}
      value=''
      required={required}
      {...props}
    />
  );
};
