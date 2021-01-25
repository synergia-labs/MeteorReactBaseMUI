// ChipInput.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import {ChipInput, ChipInputProps}  from './ChipInput';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/ChipInput',
  component: ChipInput,
};

const Template: Story<ChipInputProps> = (args) => <ChipInput {...args}/>;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
  label: 'Chip Input',
  borderWidth: 1,
  placeholder: 'Chip Input',
  name: 'Chip Input',
};
