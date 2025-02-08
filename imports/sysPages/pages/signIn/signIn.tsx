import React, { useContext, useEffect } from 'react';
import SignInStyles from './signInStyles';
import { useNavigate } from 'react-router-dom';
import SysTextField from '../../../ui/components/sysFormFields/sysTextField/sysTextField';
import SysForm from '../../../ui/components/sysForm/sysForm';
import SysFormButton from '../../../ui/components/sysFormFields/sysFormButton/sysFormButton';
import { signInSchema } from './signinsch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

const SignInPage: React.FC = () => {
	const { showNotification } = useContext(AppLayoutContext);
	const { user, signIn } = useContext<IAuthContext>(AuthContext);
	const navigate = useNavigate();
	const { Container, Content, FormContainer, FormWrapper } = SignInStyles;

	const handleSubmit = ({ email, password }: { email: string; password: string }) => {
		signIn(email, password, (err) => {
			if (!err) navigate('/');
			showNotification({
				type: 'error',
				title: 'Erro ao tentar logar',
				message: 'Email ou senha inválidos',
			});
		});
;	};

	const handleForgotPassword = () => navigate('/password-recovery');

	useEffect(() => {
		if (user) navigate('/');
	}, [user]);

	return (
		<Container>
			<Content>
				<Typography variant="h1" display={'inline-flex'} gap={1}>
					<Typography variant="inherit" color={(theme) => theme.palette.sysText?.tertiary}>
						{'{'}
					</Typography>
					Boilerplate
					<Typography variant="inherit" color="sysText.tertiary">
						{'}'}
					</Typography>
				</Typography>

				<FormContainer>
					<Typography variant="h5">Acesse o sistema</Typography>
					<SysForm schema={signInSchema} onSubmit={handleSubmit} debugAlerts={false}>
						<FormWrapper>
							<SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
							<SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />
							<Button variant="text" sx={{ alignSelf: 'flex-end' }} onClick={handleForgotPassword}>
								<Typography variant="link">Esqueci minha senha</Typography>
							</Button>
							<Box />
							<SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} />}>
								Entrar
							</SysFormButton>
						</FormWrapper>
					</SysForm>
				</FormContainer>

				<Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
			</Content>
		</Container>
	);
};

export default SignInPage;
