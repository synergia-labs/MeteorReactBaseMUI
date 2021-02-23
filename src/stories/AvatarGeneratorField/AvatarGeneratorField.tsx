import React from 'react';


import AvatarGeneratorFieldComp from '/imports/ui/components/SimpleFormFields/AvatarGeneratorField/AvatarGeneratorField';

export interface AvatarGeneratorFieldProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  type?:string;
}
/**
 * AvatarGeneratorField é utilizado para a a criação de avatares. 
 * 
 *  Schema:
 * 
 *  avatar: {
    type: String,
    label: 'Avatar',
    defaultValue: '',
    optional: true,
    isImage: true,
  },
*
 */
export const AvatarGeneratorField: React.FC<AvatarGeneratorFieldProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  type,
  ...props
}) => {
  return (
    <AvatarGeneratorFieldComp
      placeholder={placeholder}
      name={name}
      type={type}
      {...props}
    />
  );
};
