import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ShowDialog, IShowDialogProps } from './showDialog';
import { Box, DialogTitle } from '@mui/material';
import { SysButton } from '../../components/SimpleFormFields/SysButton/SysButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const meta: Meta<IShowDialogProps> = {
    title: 'ui/GeneralComponents/ShowDialog',
    component: ShowDialog,
    tags: ['autodocs'],
    argTypes:{
        component : {table: {disable: true}},
        ref       : {table: {disable: true}},
        PaperProps: {table: {disable: true}},
        actions   : {control: {disable: true}},
        children  : {control: {disable: true}},
        close     : {control: {disable: true}},
        open      : {control: {disable: true}},
        prefixIcon: {control: {disable: true}},
        sufixIcon : {control: {disable: true}},
        header    : {control: {disable: true}},
        body      : {control: {disable: true}},
        transition: {
            control:{
                type: 'select',
                options: ['zoom', 'slide', 'fade', 'grow'],
            } 
        },
        fullScreenMediaQuery: {
            control:{
                type: 'select',
                options: ['xs', 'sm', 'md', 'lg', 'xl'],
            } 
        },
    },
    args:{
        open: false,
        close: () => { },
        onOpen: () => { },
        onClose: () => { },
    },
};

export default meta;

const Template: StoryObj<IShowDialogProps> = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <SysButton onClick={() => setOpen(true)}>Abrir Diálogo</SysButton>
                <ShowDialog {...args} open={open} close={() => setOpen(false)} />
            </Box>
        );
    },
};

export const Informacao: StoryObj<IShowDialogProps> = {
    ...Template,
    args: {
        title: 'Titulo da sua informação',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas integer eget aliquet nibh. Purus in massa tempor nec feugiat nisl pretium fusce. Sollicitudin nibh sit amet commodo nulla facilisi nullam. Purus in mollis nunc sed id. Quisque id diam vel quam elementum pulvinar. Et netus et malesuada fames ac turpis egestas. Egestas fringilla phasellus faucibus scelerisque eleifend donec',
        actions: (
            <SysButton onClick={() => alert('Teste de apertar o botão') }>Confirmar</SysButton>
        ),
        sufixIcon: <CheckCircleOutlineIcon />,
    },
};

export const DialogDeDelecacao: StoryObj<IShowDialogProps> = {
    ...Template,
    parameters: {
        docs: {
            description: {
                story: `Esta história ilustra um diálogo de confirmação de exclusão`
            }
        }
    },
    args: {
        title: 'Deletar item',
        message: `Você tem certeza que deseja deletar esse item?  Essa ação não pode ser desfeita.`,
        sufixIcon: <HighlightOffOutlinedIcon  sx={{fontSize: '64px !important'}}/>,
        actions: (
            <>
                <SysButton styleVariant='none' onClick={() => alert('Teste de apertar o botão') }>Cancelar</SysButton>
                <SysButton onClick={() => alert('Teste de apertar o botão') }>Confirmar</SysButton>
            </>
        ),
    },
};

export const DialogDeNotificacao: StoryObj<IShowDialogProps> = {
    ...Template,
    args: {
        sx:{
            minWidth: '400px',
        },
        children: (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
            }}>
                <CheckCircleOutlineIcon sx={{fontSize: '200px !important', color: 'green'}}/>
                <DialogTitle>
                    Sucesso
                </DialogTitle>
            </Box>
        )
    }
};