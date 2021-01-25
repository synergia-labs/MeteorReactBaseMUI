// RadioField.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { RadioField, RadioFieldProps } from './RadioButtonField';

// This default export determines where your story goes in the story list
export default {
  title: 'Example/RadioField',
  component: RadioField,
  args: {
    disabled: false,
    required: false,
    radiosList: [],
  },
  argTypes: {
  },
};

const Template: Story<RadioFieldProps> = (args) => <RadioField {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  /* the args you need here will depend on your component */
  placeholder: 'Opções da Tarefa',
  name: 'Opções da Tarefa',
  radiosList: ['Todo', 'Doing', 'Done'],
};
DefaultStory.argTypes = {
  /* the args you need here will depend on your component */
};
