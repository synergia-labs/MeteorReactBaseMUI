import React from 'react';

import Container from '@mui/material/Container';
import * as appStyle from '/imports/materialui/styles';
import {Avatar, Box, Button, Typography} from '@mui/material';
import { BaseButton } from '../../components/SimpleFormFields/Button/baseButton';
import { AppContext } from '../../AppGeneralComponents';
import { FixedMenuLayoutContext } from '../../layouts/FixedMenuLayout';
import Delete from '@mui/icons-material/Delete';

const Home = () => {
    const { themeOptions, user, showDialog } = React.useContext(AppContext);
    const { showNotification } = React.useContext(FixedMenuLayoutContext);
    
    return(
        <>
            <Button
                onClick={() => {
                    showDialog(
                         {
                            icon: <Delete />,
			title: 'abs',
			content: () => {
				return <p>aaaa</p>;
			},
			actions: ({ closeDialog }: { closeDialog: () => void }) => [
				<Button key={'botaoNao'} variant={'outlined'} color={'secondary'} onClick={closeDialog}>
					Não
				</Button>,
				<Button
					key={'botaoSim'}
					variant={'contained'}
					onClick={() => {
						closeDialog();
					}}
					color={'primary'}>
					Sim
				</Button>
			]
                        }
                    );
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
