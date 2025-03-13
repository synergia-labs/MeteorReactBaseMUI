import React, { useContext, useEffect } from 'react';
import Styles from './signInStyles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AuthContext, { IAuthContext } from '/imports/app/authProvider/authContext';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import signInSchema from '../../schemas/signinsch';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import Context, { IUserProfileContext } from '../userProfileContext';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

const SignInPage: React.FC = () => {
	const { user } = useContext<IAuthContext>(AuthContext);
	const context = useContext<IUserProfileContext>(Context);

	const navigate = useNavigate();
	const handleForgotPassword = () => navigate('/password-recovery');

	return (
		<Styles.container>
			<Typography variant="h5">Acesse o sistema</Typography>
			<SysForm schema={signInSchema} onSubmit={context.loginWithPassword} debugAlerts={false}>
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