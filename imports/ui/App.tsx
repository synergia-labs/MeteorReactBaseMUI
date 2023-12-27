import React, { useState } from 'react';
import { FixedMenuLayout } from './layouts/FixedMenuLayout';
import { AppGeneralComponents} from './AppGeneralComponents';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '/imports/materialui/theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

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
			<AppGeneralComponents  // AppContainer
				themeOptions={{
					setFontScale,
					fontScale,
					setDarkThemeMode,
					isDarkThemeMode: !!darkThemeMode
				}}>
				<FixedMenuLayout/> {/* AppLayout */}
			</AppGeneralComponents>
		</ThemeProvider>
	);
};
