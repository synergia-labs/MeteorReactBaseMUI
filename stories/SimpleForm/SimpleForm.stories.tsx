// SimpleForm.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SimpleForm, SimpleFormProps } from './SimpleForm';


const screenState = '';
const exampleApi = '';
const schema = '';
const exampleDoc = '';
const handleSubmit = '';
const loading = '';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/SimpleForm',
  component: SimpleForm,
    decorators: [story => <div
                    mode={screenState}
                    schema={exampleApi.schema}
                    doc={exampleDoc}
                    onSubmit={handleSubmit}
                    loading={loading}>{story()}</div>],
  args: {
    disabled: false,
    required: false,
    options: [],
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
  },
};

const Template: Story<SimpleFormProps> = (args) => <SimpleForm {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  /* the args you need here will depend on your component */
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
DefaultStory.argTypes = {
  /* the args you need here will depend on your component */
};
