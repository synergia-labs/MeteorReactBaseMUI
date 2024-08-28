import React, { useCallback, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '/imports/ui/materialui/theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { ISysThemeOptions } from '../typings/BoilerplateDefaultTypings';
import { AppContainer } from './appContainer';
import { AppLayout } from './appLayout';
import GlobalStyles from "@mui/material/GlobalStyles";

export interface IThemeOptions {
	darkMode: boolean;
	fontScale: number;
	isMobile: boolean;
	setDarkThemeMode: (darkMode: boolean) => void;
	setFontScale: (fontScale: number) => void;
}

export const App = () => {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const userAgent = window.navigator.userAgent.toLowerCase();
	const isMobile = /iphone|ipod|android|ie|blackberry|fennec/.test(userAgent);
	const isTablet = /ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/.test(userAgent);

	const [darkThemeMode, setDarkThemeMode] = useState<boolean>(prefersDarkMode);
	const [fontScale, setFontScale] = useState<number>(1);
	const deviceType: 'mobile' | 'tablet' | 'desktop' = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

	const changeFontScale = useCallback(
		(fontScale: number) => {
			setFontScale(fontScale);
		},
		[fontScale]
	);
	const changeThemeMode = useCallback(
		(value: boolean) => {
			setDarkThemeMode(value);
		},
		[darkThemeMode]
	);

	const themeOptions: ISysThemeOptions = useMemo(
		() => ({
			darkMode: darkThemeMode,
			fontScale,
			deviceType,
			setDarkThemeMode: changeThemeMode,
			setFontScale: changeFontScale
		}),
		[darkThemeMode, fontScale, deviceType]
	);

	return (
		<ThemeProvider theme={getTheme(themeOptions)}>
			<CssBaseline enableColorScheme />
      { !isMobile && !isTablet && <GlobalStyles styles={{
        scrollbarColor: '#ccc #00000012',
        scrollbarWidth: 'thin',
        '::-webkit-scrollbar': {
          width: '10px',
          height: '8px',
          margin: '16px'
        },
        '::-webkit-scrollbar-track': {
          background: '#00000012',
          margin: '16px',
          borderRadius: '20px'
        },
        '::-webkit-scrollbar-thumb': {
          background: '#ccc',
          borderRadius: '20px'
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: '#bbb'
        }
      }}/>}
			<AppContainer>
				<AppLayout themeOptions={themeOptions} />
			</AppContainer>
		</ThemeProvider>
	);
};
