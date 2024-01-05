import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ShowDialog, IShowDialogProps } from './showDialog';
import { Box, DialogTitle, TextField } from '@mui/material';
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
        duration: undefined,
    },
};

export default meta;

const Template: StoryObj<IShowDialogProps> = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                <SysButton onClick={() => setOpen(true)}>Abrir Diálogo</SysButton>
                <ShowDialog {...args} open={open} close={() => setOpen(false)} />
            </Box>
        );
    },
};

export const Informacao: StoryObj<IShowDialogProps> = {
    ...Template,
    storyName: 'Exibição de Informação',
    args: {
        title: 'Titulo da sua informação',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas integer eget aliquet nibh. Purus in massa tempor nec feugiat nisl pretium fusce. Sollicitudin nibh sit amet commodo nulla facilisi nullam. Purus in mollis nunc sed id. Quisque id diam vel quam elementum pulvinar. Et netus et malesuada fames ac turpis egestas. Egestas fringilla phasellus faucibus scelerisque eleifend donec',
        actions: (
            <SysButton onClick={() => alert('Teste de apertar o botão') }>Confirmar</SysButton>
        ),
        sufixIcon: <CheckCircleOutlineIcon />,
    },
    parameters: {
        docs: {
            description: {
                story: 'Um diálogo simples para exibir informações ao usuário, com título e mensagem customizáveis.'
            }
        }
    }
};

export const DialogDeDelecacao: StoryObj<IShowDialogProps> = {
    ...Template,
    storyName: 'Diálogo de Confirmação de Deleção',
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
    parameters: {
        docs: {
            description: {
                story: 'Diálogo utilizado para confirmar a deleção de um item. Inclui um ícone de alerta e opções para cancelar ou confirmar a ação.'
            }
        }
    }
};

export const DialogDeNotificacao: StoryObj<IShowDialogProps> = {
    ...Template,
    storyName: 'Notificação de Sucesso',
    args: {
        sx:{
            minWidth: '400px',
        },
        transition: 'zoom',
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
    },
    parameters: {
        docs: {
            description: {
                story: 'Um diálogo de notificação para indicar o sucesso de uma operação, apresentando um ícone e título de sucesso.'
            }
        }
    }
};

export const DialogDeFormulario: StoryObj<IShowDialogProps> = {
    ...Template,
    storyName: 'Diálogo com Formulário',
    args: {
        title: 'Cadastro de Usuário',
        body: (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 , marginTop: '10px'}}>
                <TextField label="Nome" name='nome' variant="outlined" />
                <TextField label="Email" type="email" name = 'email' variant="outlined" />
                <TextField label="Senha" type="password" name = 'password' variant="outlined" />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                    <SysButton 
                        variant="contained" 
                        color="primary" 
                        onClick={(event) => alert(
                            `Nome: ${event.currentTarget.form?.nome.value}\n` +
                            `Email: ${event.currentTarget.form?.email.value}\n` +
                            `Senha: ${event.currentTarget.form?.password.value}\n`
                        )}
                    >Enviar</SysButton>
                    <SysButton variant="outlined" onClick={() => {}}>Cancelar</SysButton>
                </Box>
            </Box>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Esta história ilustra um diálogo contendo um formulário de cadastro de usuário. Ele inclui campos para nome, email e senha, juntamente com botões para enviar o formulário ou cancelar a operação. O formulário utiliza componentes do Material-UI para uma aparência mais moderna e funcional.'
            }
        }
    },
};

export const DialogPersonalizado: StoryObj<IShowDialogProps> = {
    ...Template,
    storyName: 'Diálogo Personalizado',
    args: {
        title: 'Alerta Personalizado',
        message: 'Esta é uma mensagem de alerta personalizada. Você pode personalizar este diálogo como desejar.',
        actions: (
            <>
                <SysButton onClick={() => alert('Botão OK clicado')}>OK</SysButton>
                <SysButton onClick={() => {}}>Fechar</SysButton>
            </>
        ),
        sx: {
            backgroundColor: 'lightblue',
            color: 'navy',
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Este diálogo demonstra a flexibilidade do componente `ShowDialog` para personalização. Aqui, ele é usado para criar um alerta com uma mensagem e estilização customizadas. Além dos botões "OK" e "Fechar", o diálogo possui um fundo azul claro e texto em cor navy, ilustrando como pode ser adaptado para diferentes necessidades de design.'
            }
        }
    },
};