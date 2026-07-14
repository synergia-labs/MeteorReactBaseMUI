import React from 'react';
import AuthProvider from './authProvider/authProvider';
import AppLayoutProvider from './appLayoutProvider/appLayoutProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouterSwitch } from './routes/appRouterSwitch';

export const App = () => {
	return (
		<AuthProvider>
			<AppLayoutProvider>
				<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
					<AppRouterSwitch />
				</Router>
			</AppLayoutProvider>
		</AuthProvider>
	);
};
