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
 * RadioButtonField é respondável pela caixa de seleção da situação atual do projeto. 
 * 
 * Schema:
 * 
 *  statusCheck: {
    type: Object,
    label: 'Status CheckBox',
    defaultValue: '',
    optional: false,
    checksList: ['Todo', 'Doing', 'Done'],
    validate: (value) => {
      const statusTrue = value&&Object.keys(value).filter( status => {
        if(value[status]){
          return status
        }
      })
      return  statusTrue.length <= 1
    }
  },
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
