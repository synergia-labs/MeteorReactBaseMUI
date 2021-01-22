// AudioRecorder.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import {AudioRecorder, AudioRecorderProps}  from './AudioRecorder';

// This default export determines where your story goes in the story list
export default {
  title: 'AudioRecorder',
  component: AudioRecorder,
};

const Template: Story<AudioRecorderProps> = (args) => <AudioRecorder {...args}/>;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
  label: 'Imagem',
  borderWidth: 1,
};
