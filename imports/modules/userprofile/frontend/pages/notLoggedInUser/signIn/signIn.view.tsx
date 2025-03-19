import React, { useContext, useEffect, useRef } from 'react';
import Styles from './signIn.styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import Context, { INotLoggedInUserContext } from '../notLoggedInUser.context';
import { ISysFormRef } from '/imports/ui/components/sysForm/typings';
import signInFrontSchema from './signin.schema';

const SignInPage: React.FC = () => {
	const context = useContext<INotLoggedInUserContext>(Context);
	const sysFormRef = useRef<ISysFormRef>(null);

	const navigate = useNavigate();
	const handleForgotPassword = () => {
		const email = sysFormRef.current?.getDocValues()?.email;
		if(email) navigate(`/guest/forgot-password/${email}`);
		else navigate('/guest/forgot-password');
	};
	useEffect(() => {
		if(context.hasAdminUser) return;
		navigate('/guest/create-admin-user');
	}, [context.hasAdminUser]);

	return (
		<Styles.container>
			<Typography variant="h5">Acesse o sistema</Typography>
			<SysForm schema={signInFrontSchema} onSubmit={context.loginWithPassword} debugAlerts={false} ref={sysFormRef}>
				<Styles.formContainer>
					<SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
					<SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />
					<Button variant="text" sx={{ alignSelf: 'flex-end' }} onClick={handleForgotPassword}>
						<Typography variant="link">Esqueci minha senha</Typography>
					</Button>
				</Styles.formContainer>
				<SysFormButton variant="contained" color="primary" endIcon={<SysIcon name={'arrowForward'} />}>
					Entrar
				</SysFormButton>
				<Styles.externalLoginContainer>
					<Button startIcon={<GitHubIcon />} onClick={context.loginWithGithub}>
						Github
					</Button>
					<Button startIcon={<GoogleIcon />} onClick={context.loginWithGoogle}>
						Google
					</Button>
				</Styles.externalLoginContainer>
			</SysForm>
		</Styles.container>
	);
};

export default SignInPage;