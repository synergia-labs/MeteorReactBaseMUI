import React from 'react';
import { Typography } from '@mui/material';
import HomeSectionNotificacoes from './sections/notificacoes';
import HomeSectionDialogs from './sections/dialogs';
import HomeStyles from './HomeStyle';

const Home: React.FC = () => {
	return (
		<HomeStyles.container>
			<HomeStyles.header>
				<Typography variant="h3">Página de testes</Typography>
				<Typography variant="body1" textAlign={'justify'}>
					Bem vindo ao Boilerplate do Synergia. Essa é uma página dedicada aos testes e exibições de componentes e
					funcionalidades do nosso sistema. Esperamos que você aproveite e aprenda bastante com ela. Para mais dúvidas
					consulte nossa documentação oficial pelo storybook.
				</Typography>
			</HomeStyles.header>
			<HomeSectionNotificacoes />
			<HomeSectionDialogs />
		</HomeStyles.container>
	);
};

export default Home;