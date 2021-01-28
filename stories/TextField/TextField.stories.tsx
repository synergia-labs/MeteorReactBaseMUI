// TextField.stories.tsx

import React, { ComponentProps } from 'react';
import PropTypes from 'prop-types';

import { Story } from '@storybook/react/types-6-0';

import { TextField, TextFieldProps } from './TextField';

// This default export determines where your story goes in the story list

export default {
  title: 'MeteorReactBaseMUI/TextField',
  component: TextField,
  args: {
    disabled: false,
    required: false,
  },
  argTypes: {
    backgroundColor: { control: 'color'},
  },
};

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  /* the args you need here will depend on your component */
  placeholder: 'Título',
  name: 'Título',
};
DefaultStory.argTypes = {
  /* the args you need here will depend on your component */
};

export const PasswordStory = Template.bind({});
PasswordStory.args = {
  /* the args you need here will depend on your component */
  placeholder: 'Senha',
  name: 'Senha',
  password: true,
};
PasswordStory.argTypes = {
};

/**
Define um título genérico a ser utilizado enquanto o componente não for modificado
*/
/**
Define o nome a ser utilizado pelo componente
*/
