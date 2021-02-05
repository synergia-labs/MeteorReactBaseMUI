// GoogleApiWrapper.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import { GoogleApiWrapper, GoogleApiWrapperProps } from './MapsField';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/GoogleApiWrapper',
  component: GoogleApiWrapper,
  args: {
    required: false,
  },
  argTypes: {
  },
};

const Template: Story<GoogleApiWrapperProps> = (args) => <GoogleApiWrapper {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  /* the args you need here will depend on your component */
  placeholder: 'Localização',
  name: 'Localização',
};
DefaultStory.argTypes = {
  /* the args you need here will depend on your component */
};
