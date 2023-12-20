import type { Meta, StoryObj } from '@storybook/react';
import {BaseButton} from './baseButton';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

const meta = {
    title: 'ui/components/SimpleForm/SimpleFormFields/BaseButton',
    component: BaseButton,
    tags: ['autodocs'],
    argTypes: {
        styleVariant: {
            control: {
                type: 'select',
                options: ['primary', 'secondary', 'none'],
            },
        },
        children:{
            control: {
                type: 'none',
            }
        },
        component:{
            table: {
                disable: true,
            }
        },
        ref:{
            table: {
                disable: true,
            }
        },
        startIcon: {
            control: {
                type: 'none',
            }
        },
        endIcon: {
            control: {
                type: 'none',
            }
        },
        disabled: {
            control: {
                type: 'boolean',
            },
            defaultValue: false,
            description: 'Se o botão está desabilitado ou não.',
            type: 'boolean'
        },
    }
    
} satisfies Meta<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 'primary',
        name: 'btnPrimary',
        styleVariant: 'primary',
        text: 'Primário',
    },
};

export const BasebuttonWithStartIcon: Story = {
    args: {
        styleVariant: 'primary',
        startIcon: <AddIcon />,
        text: 'Primário com ícone Inicial',
    },
};

export const BasebuttonWithEndIcon: Story = {
    args: {
        styleVariant: 'primary',
        endIcon: <AddIcon />,
        text: 'Primário com ícone Final',
    },
};

export const BasebuttonWithIcons: Story = {
    args: {
        styleVariant: 'primary',
        startIcon: <AddIcon />,
        endIcon: <AddIcon />,
        text: 'Primário com ícones',
    },
};