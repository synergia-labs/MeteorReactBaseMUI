import React from 'react';

import Container from '@mui/material/Container';
import * as appStyle from '/imports/materialui/styles';
import {Avatar, Box, Button, CircularProgress, Typography} from '@mui/material';
import { SysButton } from '../../components/SimpleFormFields/SysButton/SysButton';
import { AppContext } from '../../AppGeneralComponents';
import { FixedMenuLayoutContext } from '../../layouts/FixedMenuLayout';
import Delete from '@mui/icons-material/Delete';
import { SysAppLayoutContext } from '/imports/ui/layouts/AppLayout';
import DeleteDialog from '/imports/ui/GeneralComponents/showDialog/custom/deleteDialog';
import NotifyDialog from '../../GeneralComponents/showDialog/custom/notifyDialog';

const Home = () => {
    const {showNotification, showDialog, closeDialog, setDarkThemeMode} = React.useContext(SysAppLayoutContext);
    
    return(
        <>
            <Button
                onClick={() => {
                    setDarkThemeMode(false);
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
                Teste
            </Button>
            <Container>
                <h1>Material-UI Template</h1>
                <p>This is a basic fixed menu template using fixed size containers.</p>
                <p>
                    A text container is used for the main container, which is useful for single column
                    layouts.
                </p>

                <img src="/images/wireframe/media-paragraph.png" style={appStyle.containerHome} />
                <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
                <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
                <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
                <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
                <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
                <img src="/images/wireframe/paragraph.png" style={appStyle.containerHome} />
            </Container>
        </>
    )
};

export default Home;
