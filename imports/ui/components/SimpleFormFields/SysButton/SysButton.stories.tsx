import type { Meta, StoryObj } from '@storybook/react';
import {SysButton} from './SysButton';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

const meta = {
    title: 'ui/components/SimpleForm/SimpleFormFields/SysButton',
    component: SysButton,
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
    
} satisfies Meta<typeof SysButton>;

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

export const SysbuttonComIconeInicial: Story = {
    args: {
        styleVariant: 'primary',
        startIcon: <AddIcon />,
        text: 'Primário com ícone Inicial',
    },
};

export const SysbuttonComIconeFinal: Story = {
    args: {
        styleVariant: 'primary',
        endIcon: <AddIcon />,
        text: 'Primário com ícone Final',
    },
};

export const SysbuttonComIcones: Story = {
    args: {
        styleVariant: 'primary',
        startIcon: <AddIcon />,
        endIcon: <AddIcon />,
        text: 'Primário com ícones',
    },
};