import React, { useEffect } from 'react';
import Container from '@mui/material/Container';

import { Meteor } from 'meteor/meteor';
import { cleanUserCache } from '../../../hooks/useUserAccount';

import { signoutStyle } from './SignoutStyle';
import { useNavigate } from 'react-router-dom';

const Signout = () => {


	useEffect(() => {
		const finalizaSessao = async () => {
			Meteor.logout();
			await cleanUserCache();
		}
		finalizaSessao();
	}, []);
	
	return (
		<Container style={signoutStyle.containerSignOut}>
			<h2 style={signoutStyle.labelExitSystem}>
				<img src="/images/wireframe/logo.png" style={signoutStyle.imageLogo} />
				<p>{'Volte sempre!!!'}</p>
			</h2>
		</Container>
	);
};

export default Signout;
