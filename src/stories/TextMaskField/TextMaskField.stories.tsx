// TextMaskField.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { TextMaskField, TextMaskFieldProps } from './TextMaskField';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/TextMaskField',
  component: TextMaskField,
  args: {
    disabled: false,
    required: false,
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template: Story<TextMaskFieldProps> = (args) => <TextMaskField {...args} />;

export const TelefoneStory = Template.bind({});
TelefoneStory.args = {
  /* the args you need here will depend on your component */
  placeholder: 'Título',
  name: 'Título',
};
TelefoneStory.argTypes = {
  /* the args you need here will depend on your component */
};

export const CellPhoneStory = Template.bind({});
CellPhoneStory.args = {
  /* the args you need here will depend on your component */
  placeholder: 'Senha',
  name: 'Senha',
};
CellPhoneStory.argTypes = {
};

export const CpfStory = Template.bind({});
CpfStory.args = {
  /* the args you need here will depend on your component */
  placeholder: 'Senha',
  name: 'Senha',
};
CpfStory.argTypes = {
};
