// SimpleImageUploadBase64.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import {SimpleImageUploadBase64, SimpleImageUploadBase64Props}  from './SimpleImageUploadBase64';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/SimpleImageUploadBase64',
  component: SimpleImageUploadBase64,
};

const Template: Story<SimpleImageUploadBase64Props> = (args) => <SimpleImageUploadBase64 {...args}/>;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
  label: 'Imagem',
  placeholder: 'Imagem',
  name: 'Imagem',
  borderWidth: 1,
};
