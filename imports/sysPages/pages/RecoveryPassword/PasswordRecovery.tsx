// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import TextField from '/imports/ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { Box, CircularProgress, Typography } from '@mui/material';

import { SysAppLayoutContext } from '/imports/app/AppLayout';
import SignInStyles from '../signIn/signInStyles';
import { useNavigate } from 'react-router-dom';
import { sysSizing } from '/imports/ui/materialui/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const PasswordRecovery = (props: IDefaultContainerProps) => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [msg, setMsg] = React.useState<boolean>(false);

	const { showNotification } = useContext(SysAppLayoutContext);

	const navigate = useNavigate();

	const handleSubmit = (doc: { email: string }) => {
		const { email } = doc;

		Accounts.forgotPassword({ email }, (err?: Meteor.Error | Error | undefined) => {
			if (err) {
				if (err.message === 'User not found [403]') {
					showNotification &&
						showNotification({
							type: 'warning',
							title: 'Problema na recuperação da senha!',
							message: 'Este email não está cadastrado em nossa base de dados!'
						});
				} else {
					showNotification &&
						showNotification({
							type: 'warning',
							title: 'Problema na recuperação da senha!',
							message: 'Erro ao recriar a senha, faça contato com o administrador!!'
						});
				}
			} else {
				showNotification &&
					showNotification({
						type: 'success',
						title: 'Senha enviada!',
						message: 'Acesse seu email e clique no link para criar uma nova senha.'
					});
				setMsg((prev) => !prev);
			}
		});
	};

	const schema = {
		email: {
			type: 'String',
			label: 'Email',
			optional: false
		}
	};

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
					<Typography variant="h5" color={(theme) => theme.palette.sysText?.title}>
						{!msg ? 'Esqueceu sua senha?' : 'Agora é só aguardar!'}
					</Typography>

					<Typography variant="body1" color={(theme) => theme.palette.sysText?.body} sx={{ textAlign: 'center' }}>
						{!msg
							? 'Confirme seu e-mail abaixo para receber um link de redefinição da sua senha'
							: 'Caso o e-mail informado esteja cadastrado no sistema, enviaremos um link para a redefinição de sua senha'}
					</Typography>
					<SimpleForm schema={schema} onSubmit={handleSubmit} styles={{ display: !msg ? 'block' : 'none' }}>
						<SignInStyles.formWrapper>
							<TextField
								label="Email"
								fullWidth={true}
								name="email"
								type="email"
								placeholder="Digite seu email"
								disabled={loading}
							/>
							<Box />
							<Box sx={{ display: 'flex', gap: sysSizing.spacingFixedMd }}>
								<Button
									onClick={() => navigate('/')}
									variant="outlined"
									color="primary"
									id="cancelar"
									startIcon={<ClearIcon />}
									sx={{ transition: 'all 0.3s ease' }}>
									{loading ? <CircularProgress size={24} /> : 'Cancelar'}
								</Button>
								<Button
									variant="contained"
									color="primary"
									id="submit"
									disabled={loading}
									startIcon={<DoneIcon />}
									sx={{ transition: 'all 0.3s ease' }}>
									{loading ? <CircularProgress size={24} /> : 'Confirmar'}
								</Button>
							</Box>
						</SignInStyles.formWrapper>
					</SimpleForm>
					<Button
						onClick={() => navigate('/')}
						variant="contained"
						color="primary"
						id="cancelar"
						startIcon={<ArrowBackIcon />}
						sx={{ transition: 'all 0.3s ease', display: !msg ? 'none' : 'flex' }}>
						{loading ? <CircularProgress size={24} /> : 'Voltar para o Login'}
					</Button>
				</SignInStyles.formContainer>

				<Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
			</SignInStyles.content>
		</SignInStyles.container>
	);
};
