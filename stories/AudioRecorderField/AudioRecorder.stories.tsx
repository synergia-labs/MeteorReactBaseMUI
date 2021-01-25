// AudioRecorder.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import {AudioRecorder, AudioRecorderProps}  from './AudioRecorder';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/AudioRecorder',
  component: AudioRecorder,
  argTypes: {
    backgroundColor: { control: 'color' },
    color: { control: 'color' },
  },
};

const Template: Story<AudioRecorderProps> = (args) => <AudioRecorder {...args}/>;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
  label: 'Audio',
  borderWidth: 1,
  placeholder: 'Audio',
  name: 'Audio',
};
