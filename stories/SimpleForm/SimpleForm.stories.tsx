// SimpleForm.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SimpleForm, SimpleFormProps } from './SimpleForm';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/SimpleForm',
  component: SimpleForm,
  args: {
    disabled: false,
    required: false,
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: Story<SimpleFormProps> = (args) => <SimpleForm {...args} />;

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
