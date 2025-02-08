import { createTheme } from '@mui/material/styles';
import React from 'react';
import { Theme, ThemeOptions } from '@mui/material';
import sysLightPalette from './sysColors';
import SysFonts from './sysFonts';
import getSysComponentsStyles from './sysComponents';

declare module '@mui/material/styles' {
	interface ISysText {
		body?: string;
		title?: string;
		base?: string;
		baseContrast?: string;
		auxiliary?: string;
		primary?: string;
		secondary?: string;
		tertiary?: string;
		disabled?: string;
	}

	interface ISysBackground {
		paper: string;
		default: string;
		bg1: string;
		bg2: string;
		bg3: string;
	}

	interface ISysAction {
		primary: string;
		primaryHover: string;
		primaryBgHover: string;
		primaryContrastText: string;
		primaryContrastBg: string;
		primaryIcon: string;
		disabled: string;
		bgDisabled: string;
		auxiliary: string;
		boxShadowFab: string;
	}

	interface IProdAction {
		primary: string;
		primaryHover: string;
		primaryBgHover: string;
		primaryContrastText: string;
		primaryIcon: string;
		disabled: string;
		bgDisabled: string;
		auxiliary: string;
	}

	interface Palette {
		tertiary: Palette['primary'];
		sysText?: ISysText;
		sysBackground?: ISysBackground;
		sysAction?: ISysAction;
	}

	interface PaletteOptions {
		tertiary?: PaletteOptions['primary'];
		sysText?: Partial<ISysText>;
		sysBackground?: Partial<ISysBackground>;
		sysAction?: Partial<ISysAction>;
	}

	interface TypographyVariants {
		link?: React.CSSProperties;
		button2?: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		link?: React.CSSProperties;
		button2?: React.CSSProperties;
	}
}

declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		link: true;
		button2: true;
		overline: true;
	}
}

const getLightThemeBase = (props: { fontScale: number }): ThemeOptions => {
	const fontScale = props.fontScale;
	return {
		palette: sysLightPalette,
		typography: SysFonts.getTypography(fontScale),
		spacing: 8,
	};
};

export const getTheme = (options: { fontScale: number; darkMode: boolean }) => {
	const fontScale = options.fontScale || 1;
	let theme: Theme = createTheme(getLightThemeBase({ fontScale }));

	return createTheme(theme, { ...getSysComponentsStyles(theme, fontScale) });
};
