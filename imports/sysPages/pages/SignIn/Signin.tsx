// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext, useEffect, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import Container from '@mui/material/Container';
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import { signinStyle } from './SigninStyle';
import { Box } from '@mui/material';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';
import { SysAppLayoutContext } from '../../layouts/AppLayout';
import { SysAppContext } from '../../../app/AppContainer';
import { cleanUserCache } from '/imports/hooks/useUserAccount';

interface ISignIn {
	navigate: NavigateFunction;
}

export const SignIn = (props: ISignIn) => {
	const navigate = useNavigate();
	const location = useLocation();
	const loginFormRef = React.useRef();

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

	const handleSubmit = (doc: { email: string; password: string }) => {
		const { email, password } = doc;
		Meteor.loginWithPassword(email, password, (err: any) => {
			if (err) {
				
				showNotification({
					type: 'warning',
					title: 'Acesso negado!',
					message:
						err.reason === 'Incorrect password'
							? 'Email ou senha inválidos'
							: err.reason === 'User not found'
							? 'Este email não está cadastrado em nossa base de dados.'
							: ''
				});
			} else {
				showNotification({
					type: 'success',
					title: 'Acesso autorizado!',
					message: 'Login de usuário realizado em nossa base de dados!'
				});
			}
		});
	};


	const callbackLogin = (err: any) => {
		if (err) {
			console.log('Login Error: ', err);
			if (err.errorType === 'Accounts.LoginCancelledError') {
				showNotification({
					title:'Autenticação cancelada', message: 'error'});
				//self.setState({ error: 'AUtenticação cancelada' })
			} else {
				showNotification({
					type: 'error',
					title: err.error,
					message: 'error'
				});
			}
		} else {
			navigate('/');
		}
	};

	React.useEffect(() => {
		if (!!user && !!user._id) navigate('/');

	}, [user]);

	React.useEffect(() => {
		if (location.pathname === '/signout') navigate('/signin');
	}, [location.pathname]);

	return (
		<>
			<Container sx={{ width: '100%', maxWidth: 400 }}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<Box>
						<h2 style={signinStyle.labelAccessSystem}>
							<img src="/images/wireframe/logo.png" style={signinStyle.imageLogo} />
							<span>Acessar o sistema</span>
						</h2>
						<SimpleForm
								ref={loginFormRef}
							schema={{
								email: { type: 'String', label: 'Email', optional: false },
								password: { type: 'String', label: 'Senha', optional: false }
							}}
							onSubmit={handleSubmit}>
							<Box>
								<TextField label="Email" fullWidth={true} name="email" type="email" placeholder="Digite seu email" />
								<TextField
									label="Senha"
									fullWidth={true}
									name="password"
									placeholder="Digite sua senha"
									type="password"
								/>
								<Box sx={signinStyle.containerButtonOptions}>
									<Button id="forgotPassword" color={'secondary'} onClick={() => navigate('/password-recovery')}>
										Esqueci a minha senha
									</Button>
									<Button id="submit" variant={'outlined'} color={'primary'}
												onClick={() => {
													loginFormRef.current.onSubmitForm();
												}}
									>
										Entrar
									</Button>
								</Box>
							</Box>
						</SimpleForm>
						<Box style={signinStyle.containerRouterSignUp}>
							<Button id="newUser" color={'secondary'} onClick={() => navigate('/signup')}>
								É novo por aqui? Clique aqui para se cadastrar!
							</Button>
						</Box>
						<Box
							key="loginoptions"
							style={{
								paddingRight: 5,
								width: '102%',
								margin: 0,
								padding: 0,
								display: 'flex',
								flexDirection: 'column'
							}}>

						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
};
