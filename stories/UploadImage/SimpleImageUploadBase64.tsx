import React from 'react';


import SimpleImageUploadBase64Comp from '/imports/ui/components/SimpleFormFields/ImageUpload/SimpleImageUploadBase64';

export interface SimpleImageUploadBase64Props {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  type?:string;
}
/**
 * Primary UI component for user interaction
 */
export const SimpleImageUploadBase64: React.FC<SimpleImageUploadBase64Props> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  type,
  ...props
}) => {
  return (
    <SimpleImageUploadBase64Comp
      placeholder={placeholder}
      name={name}
      type={type}
      {...props}
    />
  );
};
