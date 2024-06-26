import React, { useContext, useEffect } from 'react';
import SignInStyles from './signInStyles';
import { Meteor } from 'meteor/meteor';
import { SysAppLayoutContext } from '/imports/app/AppLayout';
import { useNavigate } from 'react-router-dom';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { SysAppContext } from '/imports/app/AppContainer';
import SysTextField from '/imports/ui/components/sysFormFields/sysTextField/sysTextField';
import SysForm from '/imports/ui/components/sysForm/sysForm';
import SysFormButton from '/imports/ui/components/sysFormFields/sysFormButton/sysFormButton';
import { signInSchema } from './signinsch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const SignInPage: React.FC = () => {
  const { showNotification } = useContext(SysAppLayoutContext);
  const { user } = useContext(SysAppContext);
  const navigate = useNavigate();

  const handleSubmit = ({ email, password }: { email: string; password: string }) =>
    Meteor.loginWithPassword(email, password, (err) => {
      if (!err) return navigate('/');
      if ((err as Meteor.Error).reason === 'User not found')
        return showNotification({
          type: 'error',
          title: 'Não foi possível realizar o login',
          message: 'Este email não está cadastrado em nossa base de dados.'
        });
      showNotification({
        type: 'error',
        title: 'Não foi possível realizar o login',
        message: (err as Meteor.Error).reason || (err as Meteor.Error).message || 'Erro desconhecido'
      });

    });

  const handleForgotPassword = () => navigate('/password-recovery');


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
          <SysForm schema={signInSchema} onSubmit={handleSubmit} debugAlerts={false}>
            <SignInStyles.formWrapper>
              <SysTextField name="email" label="Email" fullWidth placeholder="Digite seu email" />
              <SysTextField label="Senha" fullWidth name="password" placeholder="Digite sua senha" type="password" />
              <Button variant="text" sx={{ alignSelf: 'flex-end' }} onClick={handleForgotPassword}>
                <Typography variant="link">Esqueci minha senha</Typography>
              </Button>
              <Box />
              <SysFormButton variant="contained" color="primary" endIcon={<ArrowForwardRoundedIcon />}>
                Entrar
              </SysFormButton>
            </SignInStyles.formWrapper>
          </SysForm>
        </SignInStyles.formContainer>

        <Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
      </SignInStyles.content>
    </SignInStyles.container>
  );
};

export default SignInPage;
