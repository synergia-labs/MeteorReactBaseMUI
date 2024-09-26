import React from 'react';
import Typography from '@mui/material/Typography';
import HomeSectionNotificacoes from './sections/notificacoes';
import HomeSectionDialogs from './sections/dialogs';
import HomeStyles from './homeStyle';
import HomeSectionComponents from "/imports/sysPages/pages/home/sections/componentTests";


const Home: React.FC = () => {
  const { Container, Header, } = HomeStyles;

	return (
		<Container>
      <Header>
				<Typography variant="h3">Página de testes</Typography>
				<Typography variant="body1" textAlign={'justify'}>
					Bem vindo ao Boilerplate do Synergia. Essa é uma página dedicada aos testes e exibições de componentes e
					funcionalidades do nosso sistema. Esperamos que você aproveite e aprenda bastante com ela. Para mais dúvidas
					consulte nossa documentação oficial pelo storybook.
				</Typography>
			</Header>
			<HomeSectionNotificacoes />
			<HomeSectionDialogs />
      <HomeSectionComponents />
		</Container>
	);
};

export default Home;
