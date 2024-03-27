import React from 'react';
import { SysTabs } from './sysTabs';
import { Meta, StoryObj } from '@storybook/react';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

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
			container: { width: '480px' }
		}
	}
};

export const PreventScroll: Story = {
	args: {
		value: '1',
		variant: 'scrollable',
		scrollButtons: false,
		sxMap: {
			container: { width: '520px' }
		}
	}
};

export const Vertical: Story = {
	args: {
		orientation: 'vertical',
		sxMap: {
			container: { width: '150px' }
		}
	}
};

export const TabIcon: Story = {
	args: {
		abas: [
			{ label: 'Item One', value: '1', icon: <PhoneIcon /> },
			{ label: 'Item Two', value: '2', icon: <FavoriteIcon />, iconPosition: 'end' },
			{ label: 'Item Three', value: '3', icon: <PersonPinIcon />, iconPosition: 'bottom' }
		]
	}
};
