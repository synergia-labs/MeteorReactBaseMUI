// DatePickerField.stories.tsx

import React, { ComponentProps } from 'react';
import { Story } from '@storybook/react/types-6-0';

import {DatePickerField, DatePickerFieldProps}  from './DatePickerField';

// This default export determines where your story goes in the story list
export default {
  title: 'MeteorReactBaseMUI/DatePickerField',
  component: DatePickerField,
};

const Template: Story<DatePickerFieldProps> = (args) => <DatePickerField {...args}/>;

export const FirstStory = Template.bind({});
FirstStory.args = {
  /* the args you need here will depend on your component */
  label: 'Data',
  borderWidth: 1,
};
