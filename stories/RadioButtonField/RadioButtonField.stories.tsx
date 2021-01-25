// RadioButtonField.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { RadioButtonField, RadioButtonFieldProps } from './RadioButtonField';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/RadioButtonField',
  component: RadioButtonField,
  args: {
    disabled: false,
    required: false,
  },
  argTypes: {
  },
};

const Template: Story<RadioButtonFieldProps> = (args) => <RadioButtonField {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  /* the args you need here will depend on your component */
  placeholder: 'Opções da Tarefa',
  name: 'Opções da Tarefa',
};
DefaultStory.argTypes = {
  /* the args you need here will depend on your component */
};
