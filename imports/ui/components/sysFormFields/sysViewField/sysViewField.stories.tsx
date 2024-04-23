import { SysViewField } from './sysViewField';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
	title: 'ui/components/sysViewField',
	component: SysViewField,
	tags: ['autodocs'],
	args: {
		label: 'Label',
		placeholder: 'Placeholder',
		disabled: false,
		sxMap: {}
	}
} satisfies Meta<typeof SysViewField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Label',
		placeholder: 'Placeholder',
		disabled: false,
		sxMap: {}
	}
};

export const Disabled: Story = {
	args: {
		label: 'Label',
		placeholder: 'Placeholder',
		disabled: true,
		sxMap: {}
	}
};
