/* eslint-disable */
import "@mui/material";
import { PaletteColor } from "@mui/material";

declare module "@mui/material/styles" {
	interface ISysText {
		body: string;
		title: string;
		base: string;
		baseContrast: string;
		auxiliary: string;
		primary: string;
		secondary: string;
		tertiary: string;
		disabled: string;
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
		tertiary: PaletteColor;
		sysText: ISysText;
		sysBackground: ISysBackground;
		sysAction: ISysAction;
	}

	interface PaletteOptions {
		tertiary: PaletteColor;
		sysText: Partial<ISysText>;
		sysBackground: Partial<ISysBackground>;
		sysAction: Partial<ISysAction>;
	}

	interface TypographyVariants {
		link: React.CSSProperties;
		button2: React.CSSProperties;
	}

	interface TypographyVariantsOptions {
		link: React.CSSProperties;
		button2: React.CSSProperties;
	}
}

declare module "@mui/material/Typography" {
	interface TypographyPropsVariantOverrides {
		link: true;
		button2: true;
		overline: true;
	}
}
