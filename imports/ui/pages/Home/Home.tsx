import React from 'react';
import { HomePageContainer, HomePageHeader } from './HomeStyle';
import { Typography } from '@mui/material';
import HomeSectionNotificacoes from './sections/notificacoes';
import HomeSectionDialogs from './sections/dialogs';

const Home : React.FC = () => {

    return (
        <HomePageContainer>
            <HomePageHeader>
                <Typography variant='h3'>
                    Página de testes
                </Typography>
                <Typography variant='body1'>
                    Bem vindo ao Boilerplate do Synergia. Essa é uma página dedicada aos testes e exibições de componentes e funcionalidades do nosso sistema.
                    Esperamos que você aproveite e aprenda bastante com ela. Para mais dúvidas consulte nossa documentação oficial pelo storybook.
                </Typography>
            </HomePageHeader>

            <HomeSectionNotificacoes />
            <HomeSectionDialogs      />    

        </HomePageContainer>
    )
} 

export default Home;
