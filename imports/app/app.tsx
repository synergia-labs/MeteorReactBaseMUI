import React from "react";
import AuthProvider from "./authProvider/authProvider";
import AppLayoutProvider from "./appLayoutProvider/appLayoutProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRouterSwitch } from "./routes/components/appRouterSwitch";
import AppRouterProvider from "./routes/components/routesProvider";
import { TemplateProvider } from "./templates/templateProvider";
import { I18nextProvider } from "react-i18next";
import I18n from "/imports/services/internationalization";

export const App = () => {
	return (
		<I18nextProvider i18n={I18n}>
			<AuthProvider>
				<AppRouterProvider>
					<AppLayoutProvider>
						<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
							<TemplateProvider>
								<AppRouterSwitch />
							</TemplateProvider>
						</Router>
					</AppLayoutProvider>
				</AppRouterProvider>
			</AuthProvider>
		</I18nextProvider>
	);
};
