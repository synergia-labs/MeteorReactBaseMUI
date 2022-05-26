// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import Container from '@mui/material/Container';
import TextField
  from '../../../ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import {resetPasswordStyle} from './ResetPasswordStyle';
import { useParams } from 'react-router-dom';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';

export const ResetPassword = (props: IDefaultContainerProps) => {

	const {showNotification, navigate} = props;

	const {token} = useParams();

	const handleSubmit = (doc: {password: string; repassword: string}) => {
    const {password, repassword} = doc;
    if (password !== repassword) {
      showNotification({
        type: 'warning',
        title: 'Error!',
        description: 'As senhas não conferem! Por gentileza, digite novamente.',
      });
			return;
		}

    Accounts.resetPassword(token!,password,	(err: any) => {
			if (err) {
				showNotification({
					type: 'warning',
					title: 'Problema na definição da senha!',
					description: 'Não foi possível atualizar a sua senha, faça contato com o administrador!',
				});
			} else {
				showNotification({
					type: 'success',
					title: 'Senha atualizada!',
					description: 'Sua senha foi atualizada com sucesso!!',
				});
				navigate('/');
			}
		},
		);
	}

	return (
		<Container style={resetPasswordStyle.containerResetPassword}>
			<h2 style={resetPasswordStyle.labelAccessSystem}>
				<img src="/images/wireframe/logo.png"	style={resetPasswordStyle.imageLogo}/>
				Acessar o sistema
			</h2>
			<SimpleForm
					schema={{
						password: {type: 'String', label: 'Email', optional: false},
						repassword: {type: 'String', label: 'Email', optional: false},
					}}
					onSubmit={handleSubmit}>
				<TextField
						label="Digite uma nova senha"
						icon="lock"
						iconPosition="left"
						name="password"
						type="password"
						placeholder="Digite uma nova senha"
				/>
				<TextField
						label="Repita a senha"
						icon="lock"
						iconPosition="left"
						name="repassword"
						type="password"
						placeholder="Repita a nova senha"
				/>
				<div style={resetPasswordStyle.containerButtonOptions}>
					<Button onClick={() => navigate('/signin')}> Voltar </Button>
					<Button variant={'outlined'} submit="true"> Atualizar a senha </Button>
				</div>

			</SimpleForm>
		</Container>
	)
}
