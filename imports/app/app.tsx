import React from "react";
import AuthProvider from "./authProvider/authProvider";
import AppLayoutProvider from "./appLayoutProvider/appLayoutProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouterSwitch } from "./routes/appRouterSwitch";
import AppRouterProvider from "./routes/routesProvider";

export const App = () => {
	return (
		<AuthProvider>
			<AppLayoutProvider>
				<AppRouterProvider>
					<Router>
						<AppRouterSwitch />
					</Router>
				</AppRouterProvider>
			</AppLayoutProvider>
		</AuthProvider>
	);
};
