import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Loading } from './Loading';

export default {
	title: 'ui/appComponents/Loading',
	component: Loading,
	args: {
		sx: {},
		label: 'Carregando...'
	},
	argTypes: {
		sx: { control: 'object' },
		label: { control: 'text' }
	}
} as Meta;

const Template: Story = (args) => <Loading {...args} />;

export const Default: Story = Template.bind({});
Default.args = {};

export const CustomStyle: Story = Template.bind({});
CustomStyle.args = {
	sx: {
		backgroundColor: '#000000',
		borderRadius: '8px',
		padding: '20px'
	}
};

export const CustomLabel: Story = Template.bind({});
CustomLabel.args = {
	label: 'Carregando dados...'
};
