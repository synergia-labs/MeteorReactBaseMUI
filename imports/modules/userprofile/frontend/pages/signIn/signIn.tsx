import React, { useContext, useEffect } from 'react';
import SignInStyles from './signInStyles';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import signInSchema from '../../schemas/signinsch';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import Context, { IUserProfileContext } from '../userProfileContext';

const SignInPage: React.FC = () => {
	const { user } = useContext<IAuthContext>(AuthContext);
    const context = useContext<IUserProfileContext>(Context);

	const navigate = useNavigate();
	const { Container, Content, FormContainer, FormWrapper } = SignInStyles;

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
					<SysForm schema={signInSchema} onSubmit={context.loginWithPassword} debugAlerts={false}>
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
							<Button onClick={context.loginWithGithub}>
								Login com o github
							</Button>
							<Button onClick={context.loginWithGoogle}>
								Login com o google
							</Button>
						</FormWrapper>
					</SysForm>
				</FormContainer>

				<Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
			</Content>
		</Container>
	);
};

export default SignInPage;