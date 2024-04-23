import React from 'react';
import { Meta, Story } from '@storybook/react';
import { SysLoading } from './sysLoading';

export default {
	title: 'ui/components/sysLoading',
	component: SysLoading,
	tags: ['autodocs'],
	args: {
		label: 'Carregando...'
	},
	argTypes: {
		label: { control: 'text' }
	}
} as Meta;

const Template: Story = (args) => <SysLoading {...args} />;

export const Default: Story = Template.bind({});
Default.args = {};

export const CustomStyle: Story = Template.bind({});
CustomStyle.args = {};

export const CustomLabel: Story = Template.bind({});
CustomLabel.args = {
	label: 'Carregando dados...'
};
