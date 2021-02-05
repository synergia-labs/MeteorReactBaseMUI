// SelectField.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SelectField, SelectFieldProps } from './SelectField';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/SelectField',
  component: SelectField,
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

const Template: Story<SelectFieldProps> = (args) => <SelectField {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  /* the args you need here will depend on your component */
  placeholder: 'Tipo',
  name: 'Tipo',
  options: [
      {value:'normal', label:'Normal'},
      {value:'extra', label:'Extra'},
  ],
};
DefaultStory.argTypes = {
  /* the args you need here will depend on your component */
};
