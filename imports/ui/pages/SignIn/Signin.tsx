// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext, useEffect, useState } from 'react';
import { NavigateFunction, useLocation } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import Container from '@mui/material/Container';
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import { signinStyle } from './SigninStyle';
import { Box } from '@mui/material';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';

interface ISignIn {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignIn = (props: ISignIn) => {
	const [redirectToReferer, setRedirectToReferer] = useState(false);

	const location = useLocation();

	const { handleExibirAppBar, handleOcultarAppBar } = useContext(FixedMenuLayoutContext);

	const { showNotification, navigate, user } = props;

	useEffect(() => {
		handleOcultarAppBar();
		return () => handleExibirAppBar();
	}, []);

	const handleSubmit = (doc: { email: string; password: string }) => {
		const { email, password } = doc;
		Meteor.loginWithPassword(email, password, (err: any) => {
			if (err) {
				showNotification({
					type: 'warning',
					title: 'Acesso negado!',
					description:
						err.reason === 'Incorrect password'
							? 'Email ou senha inválidos'
							: err.reason === 'User not found'
							? 'Este email não está cadastrado em nossa base de dados.'
							: ''
				});
			} else {
				showNotification({
					type: 'sucess',
					title: 'Acesso autorizado!',
					description: 'Login de usuário realizado em nossa base de dados!'
				});
				setRedirectToReferer(true);
			}
		});
	};

	const SocialLoginButton = ({ onLogin, buttonText, iconClass, customCss, iconOnly }) => (
		<Box
			onClick={onLogin}
			className="material-button-contained"
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				height: 50,
				color: '#FFF',
				...customCss
			}}>
			<i className={iconClass} />
			{!iconOnly && <span style={{ marginLeft: 15 }}>{buttonText}</span>}
		</Box>
	);

	const callbackLogin = (err) => {
		if (err) {
			console.log('Login Error: ', err);
			if (err.errorType === 'Accounts.LoginCancelledError') {
				showNotification('Autenticação cancelada', 'error');
				//self.setState({ error: 'AUtenticação cancelada' })
			} else {
				showNotification(err.error, 'error');
			}
		} else {
			setRedirectToReferer(true);
			navigate('/');
		}
	};

	const loginFacebook = () => {
		Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] }, (err) => {
			callbackLogin(err);
		});
	};

	const loginGoogle = () => {
		Meteor.loginWithGoogle({ requestPermissions: ['profile', 'email'] }, (err) => {
			callbackLogin(err);
		});
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
									<Button id="submit" variant={'outlined'} color={'primary'}>
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
							<Box key="divBtnGoogle" sx={{ width: '100%' }}>
								<SocialLoginButton
									key="btnGoogle"
									iconClass={'google icon'}
									onLogin={loginGoogle}
									buttonText={'Login pelo Google'}
									iconOnly={false}
									customCss={{
										background: '#dd4b39',
										width: '100%',
										cursor: 'pointer'
									}}
								/>
							</Box>
							<Box key="divBtnFaceboook" style={{ width: '100%' }}>
								<SocialLoginButton
									key="btnFaceboook"
									iconClass={'facebook icon'}
									onLogin={loginFacebook}
									buttonText={'Login pelo Facebook'}
									iconOnly={false}
									customCss={{
										background: '#3B5998',
										width: '100%',
										cursor: 'pointer'
									}}
								/>
							</Box>
						</Box>
					</Box>
				</Box>
			</Container>
		</>
	);
};
