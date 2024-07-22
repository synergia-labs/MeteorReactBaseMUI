import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import Box from '@mui/material/Box';
import { enrollAccountStyle } from './enrollAccountStyle';
import { useParams } from 'react-router-dom';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';

let emailVerified = false;
export const EnrollAccount = (props: IDefaultContainerProps) => {
	const [status, setStatus] = React.useState<string | null>(null);

	const { token } = useParams();

	if (!status) {
		Accounts.verifyEmail(token!, (err: any) => {
			if (err) {
				if (err.reason === 'Verify email link expired') {
					setStatus('Problema na verificação do Email: Token expirado, solicite uma nova senha!');
				} else {
					setStatus('Problema na verificação do Email: Token Inválido, tente novamente');
				}
			} else {
				setTimeout(() => {
					props.navigate('/');
				}, 2000);
				setStatus('Email verificado com sucesso! Redirecionando, aguarde....');
			}
		});
	}

	return (
		<Box sx={enrollAccountStyle.labelStatus}>
			<img src="/images/wireframe/logo.png" style={enrollAccountStyle.imageLogo} />
			<div>
				<p>{!status ? 'Verificando token, aguarde....' : status}</p>
			</div>
		</Box>
	);
};
