import type { Preview } from '@storybook/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import {getTheme} from '../imports/materialui/theme';

export const decorators = [
	withThemeFromJSXProvider({
	themes: {
	  light: getTheme({darkMode: false, fontScale: 1, isMobile: false}),
	  dark: getTheme({darkMode: true, fontScale: 1, isMobile: false})
	},
	defaultTheme: 'light',
	Provider: ThemeProvider,
	GlobalStyles: CssBaseline,
  })];

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		expanded: true, 
		matchers: {
		color: /(background|color)$/i,
		date: /Date$/,
		},
	},
};