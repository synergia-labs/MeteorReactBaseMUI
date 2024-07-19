import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ReplyAllOutlinedIcon from '@mui/icons-material/ReplyAllOutlined';
import { useNavigate } from 'react-router-dom';
import NoPermissionStyles from './noPermissionStyles';

export const NoPermission: React.FC = () => {
	const navigate = useNavigate();
  const { Container } = NoPermissionStyles;
	const backToHome = () => navigate('/');

	return (
		<Container>
			<img src="/images/wireframe/fav-icon-192.svg" />
			<Typography variant="h3" textAlign={'center'}>
				Você não tem permissão para acessar esta página
			</Typography>
			<Typography variant="body1" textAlign={'center'} sx={{ mt: 2, mb: 5 }}>
				A página que você está tentando acessar não permite a sua visualização.
			</Typography>
			<Button startIcon={<ReplyAllOutlinedIcon />} onClick={backToHome}>
				Voltar para a página inicial
			</Button>
		</Container>
	);
};
