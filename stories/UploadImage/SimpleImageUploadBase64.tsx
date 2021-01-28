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
 * SimpleImageUploadBase64 é utilizado para fazer o upload de imagens no projeto.
 * 
 * Schema:
 * 
 *  image: {
    type: String,
    label: 'Imagem',
    defaultValue: '',
    optional: true,
    isImage: true,
  },
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
