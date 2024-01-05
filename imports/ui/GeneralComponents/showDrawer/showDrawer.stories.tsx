import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ShowDrawer, IShowDrawerProps } from './showDrawer';
import { Box, List, ListItem, ListItemText, Divider, Checkbox, FormGroup, FormControlLabel, Slider, TextField } from '@mui/material';
import { SysButton } from '../../components/SimpleFormFields/SysButton/SysButton';

const meta: Meta<IShowDrawerProps> = {
    title: 'ui/GeneralComponents/ShowDrawer',
    component: ShowDrawer,
    tags: ['ui', 'GeneralComponents', 'ShowDrawer', 'autodocs'],
    argTypes: {
        ref: { table: { disable: true } },
        component: { table: { disable: true } },
        children: { control: { disable: true } },
        anchor: {
            control: {
                type: 'select',
                options: ['left', 'right', 'top', 'bottom'],
            }
        },
        sx: { control: 'object' },
        sxBackground: { control: 'object' },
    },
    args: {
        open: false,
        close: () => { },
        onOpen: () => { },
        onClose: () => { },
        duration: undefined,
    },
};

export default meta;

const Template: StoryObj<IShowDrawerProps> = {
    render: (args) => {
        const [open, setOpen] = useState(false);
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <SysButton onClick={() => setOpen(true)}>Abrir Drawer</SysButton>
                <ShowDrawer {...args} open={open} close={() => setOpen(false)} />
            </Box>
        );
    },
};

export const MenuLateral: StoryObj<IShowDrawerProps> = {
    render: Template.render,
    storyName: 'Menu Lateral',
    args: {
        children: (
            <List>
                <ListItem button>
                    <ListItemText primary="Início" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Configurações" />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemText primary="Ajuda" />
                </ListItem>
            </List>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Um exemplo clássico de um menu lateral. Este Drawer contém links para diferentes seções do aplicativo, como Início, Configurações e Ajuda.'
            }
        }
    }
};

export const FiltroDePesquisa: StoryObj<IShowDrawerProps> = {
    render: Template.render,
    storyName: 'Filtro de Pesquisa',
    args: {
        anchor: 'right',
        children: (
            <Box sx={{ padding: 2 }}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Opção 1" />
                    <FormControlLabel control={<Checkbox />} label="Opção 2" />
                    <FormControlLabel control={<Checkbox />} label="Opção 3" />
                </FormGroup>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ width: 200 }}>
                    <Slider
                        defaultValue={30}
                        step={10}
                        marks
                        min={10}
                        max={100}
                        valueLabelDisplay="auto"
                    />
                </Box>
                <SysButton variant="contained" sx={{ mt: 2 }}>Aplicar Filtros</SysButton>
            </Box>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Este Drawer é usado como um painel de filtros de pesquisa, permitindo ao usuário ajustar parâmetros de busca. Ideal para aplicativos de e-commerce ou listagens de dados.'
            }
        }
    }
};

export const PainelDeInformacoes: StoryObj<IShowDrawerProps> = {
    render: Template.render,
    storyName: 'Painel de Informações',
    args: {
        duration: 3000,
        anchor: 'bottom',
        children: (
            <Box sx={{ padding: 2 }}>
                <ListItemText primary="Informação Detalhada" secondary="Mais detalhes sobre o item selecionado serão exibidos aqui." />
            </Box>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Um Drawer no fundo da tela que serve como um painel de informações. Pode ser usado para mostrar detalhes adicionais sobre um item selecionado ou instruções para o usuário.'
            }
        }
    }
};

export const PainelCustomizado: StoryObj<IShowDrawerProps> = {
    render: Template.render,
    storyName: 'Painel Customizado',
    args: {
        sx: { backgroundColor: 'lightblue', color: 'navy' },
        children: (
            <Box sx={{ padding: 2 }}>
                <ListItemText primary="Conteúdo Personalizado" secondary="Este Drawer foi estilizado com cores e conteúdo customizados." />
                <SysButton variant="outlined" onClick={() => {}}>Fechar</SysButton>
            </Box>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Um exemplo de um Drawer altamente personalizado. Este exemplo mostra como o estilo e o conteúdo do Drawer podem ser modificados para atender a necessidades específicas.'
            }
        }
    }
};
