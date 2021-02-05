// AvatarGeneratorField.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import {AvatarGeneratorField, AvatarGeneratorFieldProps}  from './AvatarGeneratorField';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/AvatarGeneratorField',
  component: AvatarGeneratorField,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
  },
};

const Template: Story<AvatarGeneratorFieldProps> = (args) => <AvatarGeneratorField {...args}/>;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
  label: 'Avatar',
  borderWidth: 1,
  placeholder: 'Avatar',
  name: 'Avatar',
};
