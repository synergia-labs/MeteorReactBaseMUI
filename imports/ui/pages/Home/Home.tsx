import React from 'react';

import Container from '@mui/material/Container';
import * as appStyle from '/imports/materialui/styles';
import {Avatar, Box, Button, CircularProgress, Typography, Radio, Checkbox, ButtonBase, Fab, Tab, Tabs, Switch, Slider} from '@mui/material';
import { SysButton } from '../../components/SimpleFormFields/SysButton/SysButton';
import Delete from '@mui/icons-material/Delete';
import { SysAppLayoutContext } from '/imports/ui/layouts/AppLayout';
import DeleteDialog from '/imports/ui/GeneralComponents/showDialog/custom/deleteDialog';
import NotifyDialog from '../../GeneralComponents/showDialog/custom/notifyDialog';
import ShowNotificationChat from '/imports/ui/GeneralComponents/showNotification/custom/chatTile';
import { SysAppContext } from '../../AppContainer';
import Add from '@mui/icons-material/Add';
import { sysSizing } from '/imports/materialui/styles';

const Home = () => {
    const {
        showNotification, 
        showDialog, 
        closeDialog, 
        setDarkThemeMode, 
        closeNotification,
        showDrawer,
        deviceType,
        darkMode, 
        fontScale,
        setFontScale,
    } = React.useContext(SysAppLayoutContext);

    const {user, isLoggedIn} = React.useContext(SysAppContext);
    
    setDarkThemeMode(false);
    
    return(
        <Box sx = {{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            width: '100%',
        }}>

            <Box 
                sx={{
                    width: '100%',
                    height: '150px',
                    backgroundColor: 'primary.dark',
                }}
            />
            <Button
                onClick={() => {
                    DeleteDialog({
                        showDialog,
                        closeDialog,
                        title: 'Tem certeza que deseja excluir?',
                        message: 'Esta ação não poderá ser desfeita.',
                        onDeleteConfirm: () => {
                            showNotification({
                                message: 'Excluído com sucesso!',
                            });
                        }
                    });
            }}
            >
                Teste de Dialog
            </Button>
            <Button onClick={() => {
                ShowNotificationChat({
                    showNotification,
                    closeNotification,
                    userName: 'Usuário',
                    message: 'Mensagem',
                });
            }} >
                Teste de Notificação personalizada
            </Button>
            <Button onClick={() => {
                showDrawer({
                    anchor: 'left',
                });
            }} >
                Teste de Drawer
            </Button>
            <Button startIcon={<Add/>}>Cont-medium</Button>
            <Button disabled={true}>Cont-disabled</Button>
            <Button size={'small'} startIcon={<Add/>}>Cont-small</Button>
            <Button variant={'outlined'}>Out-medium</Button>
            <Button variant={'outlined'} disabled={true}>Out-disabled</Button>
            <Button variant={'outlined'} size={'small'}>Out-small</Button>
            <Button variant={'text'}>Text-medium</Button>
            <Button variant={'text'} disabled={true}>Text-disabled</Button>
            <Button variant={'text'} size={'small'}>Text-small</Button>
            {isLoggedIn.toString()}

            <Fab color={'primary'}>
                <Add sx={{mr: `${sysSizing.componentsButtonGap}`}}/>
                Botão
                <Add sx={{ml: `${sysSizing.componentsButtonGap}`}}/>
            </Fab>
            <Fab disabled={true}>
                <Add sx={{mr: `${sysSizing.componentsButtonGap}`}}/>
                Botão
                <Add sx={{ml: `${sysSizing.componentsButtonGap}`}}/>
            </Fab>

            <Tabs value={0}>
                <Tab label="Active" />
                <Tab label="Default" />
                <Tab label="Disabled" disabled/>
            </Tabs>

            <Switch />
            <Switch disabled/>

            <Slider color='primary' />
            <Slider disabled />

            <Slider
              color='primary'
              step={10}
              marks
              min={10}
              max={100}

            />
            <Slider
              disabled
              step={10}
              marks
              min={10}
              max={100}
            />
            <Slider
              color='primary'
              value={[20,50]}
              step={10}
              marks
              min={10}
              max={100}
            />
            <Slider
              disabled
              color='primary'
              value={[20,50]}
              step={10}
              marks
              min={10}
              max={100}
            />

        </Box>
    )
};

export default Home;
