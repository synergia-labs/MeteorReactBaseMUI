import React from 'react';

import Container from '@mui/material/Container';
import * as appStyle from '/imports/materialui/styles';
import {Avatar, Box, Button, CircularProgress, Typography} from '@mui/material';
import { SysButton } from '../../components/SimpleFormFields/SysButton/SysButton';
import Delete from '@mui/icons-material/Delete';
import { SysAppLayoutContext } from '/imports/ui/layouts/AppLayout';
import DeleteDialog from '../../GeneralComponents/SysDialog/custom/deleteDialog/deleteDialog';
import NotifyDialog from '../../GeneralComponents/SysDialog/custom/notifyDialog';
import ShowNotificationChat from '/imports/ui/GeneralComponents/showNotification/custom/chatTile';
import { SysAppContext } from '../../AppContainer';
import Add from '@mui/icons-material/Add';
import ConfirmDialog from '../../GeneralComponents/SysDialog/custom/confirmDialog/confirmDialog';

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
                        title: 'Excluir arquivo',
                        message: 'Tem certeza que deseja excluir o arquivo xx.csv?',
                        onDeleteConfirm: () => {
                            showNotification({
                                message: 'Excluído com sucesso!',
                            });
                        }
                    });
            }}
            >
                Teste de Dialog de exclusão
            </Button>

            <Button
                onClick={() => {
                    ConfirmDialog({
                        showDialog,
                        closeDialog,
                        title: 'Confirmar cadastro',
                        message: 'Tem certeza que deseja confirmar o cadastro dos dados preenchidos?',
                        onConfirm: () => {
                            showNotification({
                                message: 'Dados salvos!',
                            });
                        }
                    });
            }}
            >
                Teste de Dialog de confirmação
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
        </Box>
    )
};

export default Home;
