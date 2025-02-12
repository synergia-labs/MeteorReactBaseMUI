import React, { useContext } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate, useParams } from 'react-router-dom';
import AppLayoutContext from '/imports/app/appLayoutProvider/appLayoutContext';

let emailVerified = false;

export const EmailVerify = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const { showNotification } = useContext(AppLayoutContext);

	Accounts.verifyEmail(token!, (err: any) => {
		if (err) {
			if (!emailVerified) {
				showNotification({
					type: 'warning',
					title: 'Problema com o Token!',
					message: 'Email não verificado. Solicite um novo token!'
				});
				navigate('/');
			}
		} else {
			emailVerified = true;
			showNotification({
				type: 'success',
				title: 'Email Verificado',
				message: 'Seu e-mail foi verificado com sucesso, seja bem vindo!'
			});
			navigate('/');
		}
	});

	return <></>;
};
