import React, { useState } from 'react';
import { FixedMenuLayout } from './layouts/FixedMenuLayout';
import { AppGeneralComponents, AppContext } from './AppGeneralComponents';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { getTheme } from '/imports/materialui/theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { IUserProfile } from '../userprofile/api/UserProfileSch';
import { useUserAccount } from '../hooks/useUserAccount';

const AppContainer = () => {
	const { isLoggedIn, user, userLoading } = useUserAccount();

	const context = React.useContext(AppContext);
	const theme = useTheme();
	return (
		<FixedMenuLayout
			{...context}
			user={user as IUserProfile}
			isLoggedIn={isLoggedIn}
			userLoading={userLoading}
			theme={theme}
		/>
	);
};

export const App = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const [darkThemeMode, setDarkThemeMode] = useState(!!prefersDarkMode);
	const [fontScale, setFontScale] = useState(1);
	const isMobile = useMediaQuery('(max-width:600px)');

	const themeOptions = {
		darkMode: darkThemeMode,
		fontScale,
		isMobile
	};

	return (
		<ThemeProvider theme={getTheme(themeOptions)}>
			<CssBaseline enableColorScheme />
			<AppGeneralComponents
				themeOptions={{
					setFontScale,
					fontScale,
					setDarkThemeMode,
					isDarkThemeMode: !!darkThemeMode
				}}>
				<AppContainer />
			</AppGeneralComponents>
		</ThemeProvider>
	);
};
