import React from 'react';


import AudioRecorderComp from '/imports/ui/components/SimpleFormFields/AudioRecorderField/AudioRecorder';

export interface AudioRecorderProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  type?:string;
}
/**
 * AudioRecorder é utilizado para a gravação e reprodução de audio. 
 * 
 *  Schema:
 * 
 *  audio: {
    type: String,
    label: 'Áudio',
    defaultValue: '',
    optional: true,
  },
*
 */
export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  placeholder,
  name,
  disabled=false,
  required=false,
  type,
  ...props
}) => {
  return (
    <AudioRecorderComp
      placeholder={placeholder}
      name={name}
      type={type}
      {...props}
    />
  );
};
