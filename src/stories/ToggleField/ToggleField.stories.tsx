// ToggleField.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { ToggleField, ToggleFieldProps } from './ToggleField';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/ToggleField',
  component: ToggleField,
  args: {
    disabled: false,
    required: false,
  },
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
  },
};

const Template: Story<ToggleFieldProps> = (args) => <ToggleField {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  /* the args you need here will depend on your component */
  placeholder: 'Status',
  name: 'Status',
};
DefaultStory.argTypes = {
  /* the args you need here will depend on your component */
};
