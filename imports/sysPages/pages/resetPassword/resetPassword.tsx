// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useContext } from 'react';
import { Accounts } from 'meteor/accounts-base';
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';
import { useNavigate, useParams } from 'react-router-dom';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import SignInStyles from '../signIn/signInStyles';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

export const ResetPassword = (props: IDefaultContainerProps) => {
	const { showNotification } = useContext(AppLayoutContext);
	const navigate = useNavigate();
	const [loading, setLoading] = React.useState<boolean>(false);

	const { token } = useParams();
  const {
    Container,
    Content,
    FormContainer,
    FormWrapper,
  } = SignInStyles;

	const handleSubmit = (doc: { password: string; repassword: string }) => {
		const { password, repassword } = doc;
		setLoading(true);
		if (password !== repassword) {
			showNotification &&
				showNotification({
					type: 'warning',
					title: 'Error!',
					message: 'As senhas não conferem! Por gentileza, digite novamente.'
				});
			setLoading(false);
			return;
		}

		Accounts.resetPassword(token!, password, (err: any) => {
			if (err) {
				showNotification &&
					showNotification({
						type: 'warning',
						title: 'Problema na definição da senha!',
						message: 'Não foi possível atualizar a sua senha, faça contato com o administrador!'
					});
				setLoading(false);
			} else {
				showNotification &&
					showNotification({
						type: 'success',
						title: 'Senha atualizada!',
						message: 'Sua senha foi atualizada com sucesso!!'
					});
				navigate('/');
			}
		});
	};

	const schema = {
		password: { type: 'String', optional: false },
		repassword: { type: 'String', optional: false }
	};

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
					<Typography variant="h5">Redefinição de senha</Typography>
					<SimpleForm schema={schema} onSubmit={handleSubmit}>
						<FormWrapper>
							<TextField
								label="Nova senha"
								fullWidth={true}
								name="password"
								type="password"
								placeholder="Digite uma senha segura"
								disabled={loading}
							/>
							<TextField
								label="Repita a nova senha"
								fullWidth={true}
								name="repassword"
								placeholder="Digite novamente"
								type="password"
								disabled={loading}
							/>
							<Box />
							<Button
								variant="contained"
								color="primary"
								id="submit"
								disabled={loading}
								startIcon={<SysIcon name={'check'} />}
								sx={{ transition: 'all 0.3s ease' }}>
								{loading ? <CircularProgress size={24} /> : 'Confirmar'}
							</Button>
						</FormWrapper>
					</SimpleForm>
				</FormContainer>

				<Box component="img" src="/images/wireframe/synergia-logo.svg" sx={{ width: '100%', maxWidth: '400px' }} />
			</Content>
		</Container>
	);
};
