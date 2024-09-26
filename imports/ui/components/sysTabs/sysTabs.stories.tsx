import React from 'react';
import { SysTabs } from './sysTabs';
import { Meta, StoryObj } from '@storybook/react';
import SysIcon from '../sysIcon/sysIcon';

const meta = {
	title: 'ui/components/sysTabs',
	component: SysTabs,
	tags: ['autodocs'],
	args: {
		abas: [
			{ label: 'Item One', value: '1' },
			{ label: 'Item Two', value: '2' },
			{ label: 'Item Three', value: '3' },
			{ label: 'Item Four', value: '4' },
			{ label: 'Item Five', value: '5' }
		],
		value: '1',
		handleChange: (event: React.SyntheticEvent, newValue: string) => ({ value: newValue }),
		textColor: 'primary',
		indicatorColor: 'primary',
		variant: 'standard',
		centered: false,
		allowScrollButtonsMobile: false,
		scrollButtons: 'auto',
		orientation: 'horizontal',
		sxMap: {
			container: {},
			tabs: {},
			tab: {}
		}
	}
} satisfies Meta<typeof SysTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};

export const DisabledItens: Story = {
	args: {
		abas: [
			{ label: 'Item One', value: '1' },
			{ label: 'Item Two', value: '2', disabled: true },
			{ label: 'Item Three', value: '3', disabled: true },
			{ label: 'Item Four', value: '4', disabled: true },
			{ label: 'Item Five', value: '5' }
		]
	}
};

export const Centered: Story = {
	args: {
		centered: true,
		variant: 'standard'
	}
};

export const Scrollable: Story = {
	args: {
		variant: 'scrollable',
		scrollButtons: 'auto',
		sxMap: {
			container: { width: '480px' },
			tabs: {},
			tab: {}
		}
	}
};

export const PreventScroll: Story = {
	args: {
		value: '1',
		variant: 'scrollable',
		scrollButtons: false,
		sxMap: {
			container: { width: '520px' },
			tabs: {},
			tab: {}
		}
	}
};

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
		sxMap: {
			container: { width: '150px' },
			tabs: {},
			tab: {}
		}
	}
};

export const TabIcon: Story = {
	args: {
		abas: [
			{ label: 'Item One', value: '1', icon: <SysIcon name={'phone'} /> },
			{ label: 'Item Two', value: '2', icon: <SysIcon name={'favorite'} />, iconPosition: 'end' },
			{ label: 'Item Three', value: '3', icon: <SysIcon name={'personPin'} />, iconPosition: 'bottom' }
		]
	}
};
