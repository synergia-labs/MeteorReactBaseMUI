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
  mode?: String;
  schema?: [Object];
  doc?: [Object];
  onSubmit?: [Object];
  loading?: boolean;
}

const elements = {
  image: {
    label: 'Imagem',
    placeholder: 'Imagem',
    name: 'Imagem',
  },
  title: {
    label: 'Título',
    placeholder: 'Título',
    name: 'Título',
  },
  description: {
    label: 'Descrição',
    placeholder: 'Descrição',
    name: 'Descrição',
  },
  type: {
    placeholder: 'Tipo',
    name: 'Tipo',
    options: [
        {value:'normal', label:'Normal'},
        {value:'extra', label:'Extra'},
    ],
  },
  date: {
    label: 'Data',
    placeholder: 'Data',
    name: 'Data',
  },
  chip: {
    label: 'Chip Input',
    placeholder: 'Chip Input',
    name: 'Chip Input',
  },
  contacts: {
    type: Object,
    label: 'Contatos',
    placeholder: 'Contatos',
    name: 'Contatos',
    mask: {
      phone: {
        label: 'Telefone',
        placeholder: 'Telefone',
        name: 'Telefone',
        mask : '(##) ####-####',
      },
      cpf: {
        label: 'CPF',
        placeholder: 'CPF',
        name: 'CPF',
        mask : '###.###.###-##',
      },
    }
  },
  audio: {
    label: 'Audio',
    placeholder: 'Audio',
    name: 'Audio',
  },
  address: {
    label: 'Localização',
    placeholder: 'Localização',
    name: 'Localização',
  },
  statusRadio: {
    label: 'Status Radio',
    placeholder: 'Status Radio',
    name: 'Status Radio',
  },
  statusToggle: {
    label: 'Status Toogle',
    placeholder: 'Status Toogle',
    name: 'Status Toogle',
  },
};

/**
 * Primary UI component for user interaction
 */
export const SimpleForm: React.FC<SimpleFormProps> = ({
  mode={view},
  schema= [exampleApi.schema],
  doc= [exampleDoc],
  onSubmit= [handleSubmit],
  loading={true},
  ...props
}) => {

  return (
    <div style={{display: 'flex', flexDirection: 'column' }}>
      <SimpleImageUploadBase64
        placeholder={elements.image.placeholder}
        label={elements.image.name}
        disabled={elements.image.disabled}
        required={elements.image.required}
        {...props}
      />
      <TextField
        placeholder={elements.title.placeholder}
        label={elements.title.name}
        disabled={elements.title.disabled}
        required={elements.title.required}
        {...props}
      />
      <TextField
        placeholder={elements.description.placeholder}
        label={elements.description.name}
        disabled={elements.description.disabled}
        required={elements.description.required}
        {...props}
      />
      <SelectField
        placeholder={elements.type.placeholder}
        label={elements.type.name}
        disabled={elements.type.disabled}
        required={elements.type.required}
        {...props}
      />
      <DatePickerField
        placeholder={elements.date.placeholder}
        label={elements.date.name}
        disabled={elements.date.disabled}
        required={elements.date.required}
        {...props}
      />
      <ChipInput
        placeholder={elements.chip.placeholder}
        label={elements.chip.name}
        disabled={elements.chip.disabled}
        required={elements.chip.required}
        {...props}
      />
      <TextMaskField
        placeholder={elements.contacts.mask.phone.placeholder}
        label={elements.contacts.mask.phone.name}
        disabled={elements.contacts.mask.phone.disabled}
        required={elements.contacts.mask.phone.required}
        {...props}
      />
      <TextMaskField
        placeholder={elements.contacts.mask.cpf.placeholder}
        label={elements.contacts.mask.cpf.name}
        disabled={elements.contacts.mask.cpf.disabled}
        required={elements.contacts.mask.cpf.required}
        {...props}
      />
      <AudioRecorder
        placeholder={elements.audio.placeholder}
        label={elements.audio.name}
        disabled={elements.audio.disabled}
        required={elements.audio.required}
        {...props}
      />
      <GoogleApiWrapper
        placeholder={elements.address.placeholder}
        label={elements.address.name}
        disabled={elements.address.disabled}
        required={elements.address.required}
        {...props}
      />
      <RadioButtonField
        placeholder={elements.statusRadio.placeholder}
        label={elements.statusRadio.name}
        disabled={elements.statusRadio.disabled}
        required={elements.statusRadio.required}
        {...props}
      />
      <ToggleField
        placeholder={elements.statusToggle.placeholder}
        label={elements.statusToggle.name}
        disabled={elements.statusToggle.disabled}
        required={elements.statusToggle.required}
        {...props}
      />
    </div>
  );
};
