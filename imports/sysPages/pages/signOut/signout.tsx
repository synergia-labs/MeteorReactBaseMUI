import React, { useEffect } from 'react';
import Container from '@mui/material/Container';

import { Meteor } from 'meteor/meteor';
import Box from '@mui/material/Box';
import { signoutStyle } from './signoutStyle';

const Signout = () => {
	useEffect(() => {
		const finalizaSessao = async () => {
			Meteor.logout();
		};
		finalizaSessao();
	}, []);

	return (
		<Container style={signoutStyle.containerSignOut}>
			<Box sx={signoutStyle.labelExitSystem}>
				<img src="/images/wireframe/logo.png" style={signoutStyle.imageLogo} />
				<p>{'Volte sempre!!!'}</p>
			</Box>
		</Container>
	);
};

export default Signout;
