import React from 'react';


import GoogleApiWrapperComp from '/imports/ui/components/SimpleFormFields/MapsField/MapsField';

export interface GoogleApiWrapperProps {
  placeholder: string;
  name: string;
  required?: boolean;
  value: [Object];
}

/**
 * GoogleApiWrapper é responsável por realizar a Api com o Maps do google e disponibilizar as informações solicitadas pelo usuário.
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
