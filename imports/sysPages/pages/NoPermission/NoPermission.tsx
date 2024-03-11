import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { cleanUserCache } from '/imports/hooks/useUserAccount';

export const NoPermission = () => {
	const navigate = useNavigate();
	const location = useLocation();


	React.useEffect(() => {
		const finalizaSessao = async () => {
			Meteor.logout();
			await cleanUserCache();
		}
	
		if (location.pathname === '/signout'){
			console.log('oiii')
			finalizaSessao();
		}
	}, [location.pathname]);


	return(
	<h1 style={{ textAlign: 'center' }}>
		<img src="/images/wireframe/logo.png" />
		<p>No Permission to acess</p>
	</h1>

	)
};