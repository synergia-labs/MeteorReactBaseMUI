// TextField.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';

// This default export determines where your story goes in the story list
export default {
  title: 'TextField',
  component: TextField,
};

const Template: Story<ComponentProps<typeof TextField>> = (args) => (
  <TextField {...args} />
);

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
  label: 'hello',
  borderWidth: 1,
};
