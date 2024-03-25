import React, { useState, useCallback, useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '/imports/ui/materialui/theme';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { ISysThemeOptions } from '../typings/BoilerplateDefaultTypings';
import { AppContainer } from './AppContainer';
import { AppLayout } from './AppLayout';

export interface ThemeOptions {
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

	const [darkThemeMode, setDarkThemeMode] = useState<boolean>(!!prefersDarkMode);
	const [fontScale, setFontScale] = useState<number>(1);
	const deviceType : 'mobile' | 'tablet' | 'desktop' = (isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop');

	const changeFontScale = useCallback((fontScale: number) => { setFontScale(fontScale);}, [fontScale]);
	const changeThemeMode = useCallback((value : boolean) => {setDarkThemeMode(value);}, [darkThemeMode]);
	

	// Verificar renderizações desnecessárias
	const themeOptions : ISysThemeOptions = useMemo(() => ({
		darkMode: !!darkThemeMode,
		fontScale,
		deviceType,
		setDarkThemeMode: changeThemeMode,
		setFontScale: changeFontScale
	}), [ darkThemeMode, fontScale, deviceType]);

	return (
		<ThemeProvider theme={getTheme(themeOptions)}>
			<CssBaseline enableColorScheme />
			<AppContainer>
				<AppLayout {...themeOptions} />
			</AppContainer>
		</ThemeProvider>
	);
};
