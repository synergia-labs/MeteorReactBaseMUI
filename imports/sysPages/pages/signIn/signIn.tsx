import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import SignInStyles from './signInStyles';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';
import { Meteor } from 'meteor/meteor';
import { SysAppLayoutContext } from '/imports/app/AppLayout';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import { useNavigate } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { SysAppContext } from '/imports/app/AppContainer';

const SignInPage: React.FC = () => {
	const { showNotification } = useContext(SysAppLayoutContext);
	const { user } = useContext(SysAppContext);
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	const schema = {
		email: { type: 'String', label: 'Email', optional: false },
		password: { type: 'String', label: 'Senha', optional: false }
	};

	const handleCallback = (err?: Error | Meteor.Error | Meteor.TypedError | undefined) => {
		const { reason } = err as Meteor.Error;
		if (!err) return;

		setLoading(false);
		showNotification({
			type: 'error',
			title: 'Acesso negado!',
			message:
				reason === 'Incorrect password'
					? 'Email ou senha inválidos'
					: reason === 'User not found'
						? 'Este email não está cadastrado em nossa base de dados.'
						: ''
		});
	};

	const handleSubmit = ({ email, password }: { email: string; password: string }) => {
		setLoading(true);
		Meteor.loginWithPassword(email, password, (err) => handleCallback(err));
	};

	const handleForgotPassword = () => {
		navigate('/password-recovery');
	};

	useEffect(() => {
		if (user) navigate('/');
	}, [user]);

	return (
		<SignInStyles.container>
			<SignInStyles.content>
				<Typography variant="h1" display={'inline-flex'} gap={1}>
					<Typography variant="inherit" color={(theme) => theme.palette.sysText?.tertiary}>
						{'{'}
					</Typography>
					Boilerplate
					<Typography variant="inherit" color="sysText.tertiary">
						{'}'}
					</Typography>
				</Typography>

				<SignInStyles.formContainer>
					<Typography variant="h5">Acesse o sistema</Typography>
					<SimpleForm schema={schema} onSubmit={handleSubmit}>
						<SignInStyles.formWrapper>
							<TextField
								label="Email"
								fullWidth={true}
								name="email"
								type="email"
								placeholder="Digite seu email"
								disabled={loading}
							/>
							<TextField
								label="Senha"
								fullWidth={true}
								name="password"
								placeholder="Digite sua senha"
								type="password"
								disabled={loading}
							/>
							<Button variant="text" sx={{ alignSelf: 'flex-end' }} disabled={loading} onClick={handleForgotPassword}>
								<Typography variant="link">Esqueci minha senha</Typography>
							</Button>
							<Box />
							<Button
								variant="contained"
								color="primary"
								id="submit"
								disabled={loading}
								endIcon={<ArrowForwardRoundedIcon />}
								sx={{ transition: 'all 0.3s ease' }}>
								{loading ? <CircularProgress size={24} /> : 'Entrar'}
							</Button>
						</SignInStyles.formWrapper>
					</SimpleForm>
				</SignInStyles.formContainer>

				<Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
			</SignInStyles.content>
		</SignInStyles.container>
	);
};

export default SignInPage;
