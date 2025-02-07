import React from 'react';
import AuthProvider from './authProvider/authProvider';
import AppLayoutProvider from './appLayoutProvider/appLayoutProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouterSwitch } from './routes/appRouterSwitch';

export const App = () => {
	return (
		<AuthProvider>
			<AppLayoutProvider>
				<Router>
					<AppRouterSwitch />
				</Router>
			</AppLayoutProvider>
		</AuthProvider>
	);
};
