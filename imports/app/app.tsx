import React from "react";
import AuthProvider from "./authProvider/authProvider";
import AppLayoutProvider from "./appLayoutProvider/appLayoutProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouterSwitch } from "./routes/components/appRouterSwitch";
import AppRouterProvider from "./routes/components/routesProvider";
import { TemplateProvider } from "./templates/templateProvider";

export const App = () => {
	return (
		<AuthProvider>
			<AppRouterProvider>
				<AppLayoutProvider>
					<Router>
						<TemplateProvider>
							<AppRouterSwitch />
						</TemplateProvider>
					</Router>
				</AppLayoutProvider>
			</AppRouterProvider>
		</AuthProvider>
	);
};
