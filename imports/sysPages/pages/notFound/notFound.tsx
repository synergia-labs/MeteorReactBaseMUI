import React from 'react';
import NotFoundStyles from './notFoundStyles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
	const navigate = useNavigate();
  const { Container, } = NotFoundStyles;
	const backToHome = () => navigate('/');

	return (
		<Container>
			<img src="/images/wireframe/fav-icon-192.svg" />
			<Typography variant="h3" textAlign={'center'}>
				Página não encontrada
			</Typography>
			<Typography variant="body1" textAlign={'center'} sx={{ mt: 2, mb: 5 }}>
				A página que você está tentando acessar não existe ou se encontra indisponível.
			</Typography>
			<Button startIcon={<ReplyAllOutlinedIcon />} onClick={backToHome}>
				Voltar para a página inicial
			</Button>
		</Container>
	);
};
