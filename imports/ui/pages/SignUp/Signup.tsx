// signup component similar to login page (except loginWithPassword)
// instead createUser to insert a new user account document

// login page overrides the form’s submit event and call Meteor’s loginWithPassword()
// Authentication errors modify the component’s state to be displayed
import React, { useState } from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '../../../ui/components/SimpleFormFields/TextField/TextField';
import Button from '@mui/material/Button';
import { userprofileApi } from '../../../userprofile/api/UserProfileApi';
import SimpleForm from '/imports/ui/components/SimpleForm/SimpleForm';

import { signupStyle } from './SignupStyle';
import { Box } from '@mui/system';
import { IUserProfile } from '/imports/userprofile/api/UserProfileSch';

interface ISignUp {
	showNotification: (options?: Object) => void;
	navigate: NavigateFunction;
	user: IUserProfile;
}

export const SignUp = (props: ISignUp) => {
	const [state, setState] = useState({ email: '', password: '', error: '' });

	const { showNotification } = props;

	const handleChange = (e, { name, value }) => {
		setState({ [name]: value });
	};

	const handleSubmit = (doc) => {
		const { email, password } = doc;

		userprofileApi.insertNewUser({ email, username: email, password }, (err, r) => {
			if (err) {
				console.log('Login err', err);
				showNotification &&
					showNotification({
						type: 'warning',
						title: 'Problema na criação do usuário!',
						description: 'Erro ao fazer registro em nossa base de dados!'
					});
			} else {
				showNotification &&
					showNotification({
						type: 'sucess',
						title: 'Cadastrado com sucesso!',
						description: 'Registro de usuário realizado em nossa base de dados!'
					});
			}
		});
	};

	return (
		<Container style={signupStyle.containerSignUp}>
			<h2 style={signupStyle.labelRegisterSystem}>
				<img src="/images/wireframe/logo.png" style={signupStyle.imageLogo} />
				{'Cadastrar no sistema'}
			</h2>
			<SimpleForm
				schema={{
					email: {
						type: String,
						label: 'Email',
						optional: false
					},
					password: {
						type: String,
						label: 'Senha',
						optional: false
					}
				}}
				onSubmit={handleSubmit}>
				<TextField
					id="Email"
					label="Email"
					fullWidth
					name="email"
					type="email"
					placeholder="Digite um email"
					onChange={handleChange}
				/>
				<TextField
					id="Senha"
					label="Senha"
					fullWidth
					name="password"
					placeholder="Digite uma senha"
					type="password"
					onChange={handleChange}
				/>
				<Box sx={signupStyle.containerButtonOptions}>
					<Button color={'primary'} variant={'outlined'} id="submit">
						Cadastrar
					</Button>
				</Box>
			</SimpleForm>
			<Box sx={signupStyle.containerRouterSignIn}>
				Já tem uma conta? Faça login clicando{' '}
				<Link to="/signin" color={'secondary'}>
					aqui
				</Link>
			</Box>
		</Container>
	);
};
