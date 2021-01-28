// SimpleForm.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { SimpleForm, SimpleFormProps } from './SimpleForm';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/SimpleForm',
  component: SimpleForm,
  args: {
    mode: {},
    schema: [],
    doc: [],
    onSubmit: {},
    loading: true,
  },
  argTypes: {
  },
};

const Template: Story<SimpleFormProps> = (args) => <SimpleForm {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  /* the args you need here will depend on your component */
};
DefaultStory.argTypes = {
  /* the args you need here will depend on your component */
};
