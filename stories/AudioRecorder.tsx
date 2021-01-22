import React from 'react';
import './button.css';

import AudioRecorderComp from '/imports/ui/components/SimpleFormFields/AudioRecorderField/AudioRecorder';

export interface AudioRecorderProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  type?:string;
}
/**
 * Primary UI component for user interaction
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
