import React from 'react';

import Container from '@mui/material/Container';
import * as appStyle from '/imports/materialui/styles';
import {Button} from '@mui/material';
import { BaseButton } from '../../components/SimpleFormFields/Button/baseButton';
import { AppContext } from '../../AppGeneralComponents';

const Home = () => {
    const { themeOptions, user, showNotification } = React.useContext(AppContext);
    
    return(
        <>
            <Button
                onClick={() => {
                    themeOptions.setDarkThemeMode(!themeOptions.isDarkThemeMode);
                    showNotification?.({
                        type: 'success',
                        title: 'Tema',
                        description: `Tema alterado para ${themeOptions.isDarkThemeMode ? 'claro' : 'escuro'}`, 

                    })
                }}
            >
                {JSON.stringify(user) ?? 'Usuário não logado'}
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
