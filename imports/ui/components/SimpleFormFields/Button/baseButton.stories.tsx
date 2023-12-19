import type { Meta, StoryObj } from '@storybook/react';
import {BaseButton} from './baseButton';

const meta = {
    title: 'ui/components/SimpleForm/SimpleFormFields/Button',
    component: BaseButton,
    tags: ['autodocs'],
    
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        styleVariant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        styleVariant: 'secondary',
    },
};
