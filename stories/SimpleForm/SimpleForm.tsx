import React from 'react';

// import SimpleFormComp from '/imports/ui/components/SimpleFormFields/SimpleForm/SimpleForm';

import { TextField } from '../TextField/TextField';
import { TextMaskField } from '../TextMaskField/TextMaskField';
import { SelectField } from '../SelectField/SelectField';
import { DatePickerField } from '../DatePickerField/DatePickerField';
import { ChipInput } from '../ChipInputField/ChipInput';
import { AudioRecorder } from '../AudioRecorderField/AudioRecorder';
import { GoogleApiWrapper } from '../MapsField/MapsField';
import { RadioButtonField } from '../RadioButtonField/RadioButtonField';
import { ToggleField } from '../ToggleField/ToggleField';
import { SimpleImageUploadBase64 } from '../UploadImage/SimpleImageUploadBase64';

export interface SimpleFormProps {
  placeholder: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  options: [Object];
  backgroundColor?: string;
  color?: string;
  image: [Object];
  title: [Object];
  description: [Object];
  type: [Object];
  date: [Object];
  chip: [Object];
  contacts: [Object];
  audio: [Object];
  address: [Object];
  statusRadio: [Object];
  statusToggle: [Object];
}

/**
 * Geração automática de formulaŕios e artíficios de validação dos mesmos a partir do schema do banco de dados, simplificando a implementação de CRUDs.
 */
export const SimpleForm: React.FC<SimpleFormProps> = ({
  disabled=false,
  required=false,
  options=[],
  backgroundColor,
  color,
  image,
  title,
  description,
  type,
  date,
  chip,
  contacts,
  audio,
  address,
  statusRadio,
  statusToggle,
  ...props
}) => {

  return (
    <div style={{ backgroundColor, color, display: 'flex', flexDirection: 'column' }}>
      <SimpleImageUploadBase64
        placeholder={image.placeholder}
        label={image.name}
        disabled={image.disabled}
        required={image.required}
        {...props}
      />
      <TextField
        placeholder={title.placeholder}
        label={title.name}
        disabled={title.disabled}
        required={title.required}
        {...props}
      />
      <TextField
        placeholder={description.placeholder}
        label={description.name}
        disabled={description.disabled}
        required={description.required}
        {...props}
      />
      <SelectField
        placeholder={type.placeholder}
        label={type.name}
        disabled={type.disabled}
        required={type.required}
        {...props}
      />
      <DatePickerField
        placeholder={date.placeholder}
        label={date.name}
        disabled={date.disabled}
        required={date.required}
        {...props}
      />
      <ChipInput
        placeholder={chip.placeholder}
        label={chip.name}
        disabled={chip.disabled}
        required={chip.required}
        {...props}
      />
      <TextMaskField
        placeholder={contacts.mask.phone.placeholder}
        label={contacts.mask.phone.name}
        disabled={contacts.mask.phone.disabled}
        required={contacts.mask.phone.required}
        {...props}
      />
      <TextMaskField
        placeholder={contacts.mask.cpf.placeholder}
        label={contacts.mask.cpf.name}
        disabled={contacts.mask.cpf.disabled}
        required={contacts.mask.cpf.required}
        {...props}
      />
      <AudioRecorder
        placeholder={audio.placeholder}
        label={audio.name}
        disabled={audio.disabled}
        required={audio.required}
        {...props}
      />
      <GoogleApiWrapper
        placeholder={address.placeholder}
        label={address.name}
        disabled={address.disabled}
        required={address.required}
        {...props}
      />
      <RadioButtonField
        placeholder={statusRadio.placeholder}
        label={statusRadio.name}
        disabled={statusRadio.disabled}
        required={statusRadio.required}
        {...props}
      />
      <ToggleField
        placeholder={statusToggle.placeholder}
        label={statusToggle.name}
        disabled={statusToggle.disabled}
        required={statusToggle.required}
        {...props}
      />
    </div>
  );
};
