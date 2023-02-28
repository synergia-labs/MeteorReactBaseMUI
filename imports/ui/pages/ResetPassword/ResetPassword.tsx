// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useEffect, useContext } from 'react';
import { Accounts } from 'meteor/accounts-base';
import Container from '@mui/material/Container';
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import { resetPasswordStyle } from './ResetPasswordStyle';
import { useParams } from 'react-router-dom';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';
import { FixedMenuLayoutContext } from '../../layouts/FixedMenuLayout';
import { Box } from '@mui/material';

export const ResetPassword = (props: IDefaultContainerProps) => {
	const { showNotification, navigate } = props;

	const { handleExibirAppBar, handleOcultarAppBar } = useContext(FixedMenuLayoutContext);

	const { token } = useParams();

	useEffect(() => {
		handleOcultarAppBar();
		return () => handleExibirAppBar();
	}, []);

	const handleSubmit = (doc: { password: string; repassword: string }) => {
		const { password, repassword } = doc;
		if (password !== repassword) {
			showNotification &&
				showNotification({
					type: 'warning',
					title: 'Error!',
					description: 'As senhas não conferem! Por gentileza, digite novamente.'
				});
			return;
		}

		Accounts.resetPassword(token!, password, (err: any) => {
			if (err) {
				showNotification &&
					showNotification({
						type: 'warning',
						title: 'Problema na definição da senha!',
						description: 'Não foi possível atualizar a sua senha, faça contato com o administrador!'
					});
			} else {
				showNotification &&
					showNotification({
						type: 'success',
						title: 'Senha atualizada!',
						description: 'Sua senha foi atualizada com sucesso!!'
					});
				navigate('/');
			}
		});
	};

	return (
		<Container style={resetPasswordStyle.containerResetPassword}>
			<h2 style={resetPasswordStyle.labelAccessSystem}>
				<img src="/images/wireframe/logo.png" style={resetPasswordStyle.imageLogo} />
				Acessar o sistema
			</h2>
			<SimpleForm
				schema={{
					password: { type: 'String', label: 'Email', optional: false },
					repassword: { type: 'String', label: 'Email', optional: false }
				}}
				onSubmit={handleSubmit}>
				<TextField
					label="Digite uma nova senha"
					icon="lock"
					name="password"
					type="password"
					placeholder="Digite uma nova senha"
				/>
				<TextField
					label="Repita a senha"
					icon="lock"
					name="repassword"
					type="password"
					placeholder="Repita a nova senha"
				/>
				<Box sx={resetPasswordStyle.containerButtonOptions}>
					<Button onClick={() => navigate('/signin')}> Voltar </Button>
					<Button id="submit" variant={'outlined'}>
						{' '}
						Atualizar a senha{' '}
					</Button>
				</Box>
			</SimpleForm>
		</Container>
	);
};
