import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useParams } from 'react-router-dom';
import { IDefaultContainerProps } from '/imports/typings/BoilerplateDefaultTypings';

let emailVerified = false;

export const EmailVerify = (props: IDefaultContainerProps) => {
	const { token } = useParams();

	const { showNotification, navigate } = props;

	Accounts.verifyEmail(token!, (err: any) => {
		if (err) {
			if (!emailVerified) {
				props.showNotification({
					type: 'warning',
					title: 'Problema com o Token!',
					description: 'Email não verificado. Solicite um novo token!'
				});
				navigate('/');
			}
		} else {
			emailVerified = true;
			showNotification({
				type: 'success',
				title: 'Email Verificado',
				description: 'Seu e-mail foi verificado com sucesso, seja bem vindo!'
			});
			navigate('/');
		}
	});

	return <></>;
};
