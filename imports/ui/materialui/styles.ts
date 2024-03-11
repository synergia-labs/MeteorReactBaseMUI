import React from 'react';

/* Colors */
const sysBaseColors = {
	black: "#000000",
	white: "#ffffff",
	blue30: "#025e97",
	blue40: "#027dca",
	blue50: "#069efc",
	blue80: "#9ad8fe",
	blue95: "#e6f5ff",
	green10: "#00210e",
	green20: "#00391c",
	green30: "#00522b",
	green40: "#006d3b",
	green50: "#00894b",
	green60: "#00a65d",
	green70: "#00c46e",
	green80: "#00e280",
	green90: "#5cff9f",
	green95: "#c2ffd0",
	green97: "#ddffe2",
	grey10: "#17171c",
	grey15: "#23232a",
	grey20: "#2e2e38",
	grey30: "#454554",
	grey40: "#5c5c70",
	grey50: "#73738c",
	grey60: "#8f8fa3",
	grey70: "#a4a4b5",
	grey80: "#c7c7d1",
	grey90: "#e3e3e8",
	grey95: "#f1f1f3",
	grey97: "#f7f7f8",
	greyTransparent: "#ffffff1a",
	neon10: "#002018",
	neon20: "#00382b",
	neon30: "#005140",
	neon40: "#006b55",
	neon50: "#00876c",
	neon60: "#00a483",
	neon70: "#00c19c",
	neon80: "#00e0b5",
	neon90: "#00ffce",
	neon95: "#99ffeb",
	neon97: "#ccfff5",
	purple10: "#09006b",
	purple20: "#1400a8",
	purple30: "#312ebd",
	purple40: "#4b4ad5",
	purple50: "#6768f2",
	purple60: "#8183ff",
	purple70: "#a1a2ff",
	purple80: "#c1c1ff",
	purple90: "#e1dfff",
	purple95: "#eff0ff",
	purple97: "#f5f6fe",
	purpleGrey: "#333370",
	purpleTransparent: "#6768f21a",
	red10: "#400009",
	red20: "#680015",
	red30: "#920021",
	red40: "#bf002e",
	red50: "#e71f41",
	red60: "#ff344f",
	red70: "#ff667a",
	red80: "#ff99a7",
	red90: "#ffccd3",
	red95: "#ffe5e9",
	red97: "#fff0f2",
	yellow30: "#996e00",
	yellow40: "#cc9300",
	yellow60: "#ffc633",
	yellow80: "#ffe299",
	yellow90: "#fff1cc",
};

/* Sizing */
const sysBaseSizes = {
	baseFixed025: "4px",
	baseFixed050: "8px",
	baseFixed075: "12px",
	baseFixed1: "16px",
	baseFixed125: "20px",
	baseFixed15: "24px",
	baseFixed2: "32px",
	baseFixed3: "48px",
	baseFixed4: "64px",
	baseFixed6: "96px",
	baseFixed8: "128px",
	baseFixed12: "192px",
	baseRem025: "0.25rem",
	baseRem050: "0.5rem",
	baseRem075: "0.75rem",
	baseRem1: "1rem",
	baseRem125: "1.25rem",
	baseRem15: "1.5rem",
	baseRem2: "2rem",
	baseRem3: "3rem",
	baseRem4: "4rem",
};

const sysSizing = {
	componentsInputMinHeight: 0,
	componentsButtonSmallPy: sysBaseSizes.baseRem025,
	componentsButtonGap: sysBaseSizes.baseRem050,
	componentsButtonMediumPy: sysBaseSizes.baseRem050,
	componentsInputGap: sysBaseSizes.baseRem050,
	componentsInputPy: sysBaseSizes.baseRem050,
	componentsButtonSmallPx: sysBaseSizes.baseRem1,
	componentsInputPx: sysBaseSizes.baseRem1,
	componentsIconSizeSmall: "1.125rem",
	componentsButtonMediumPx: sysBaseSizes.baseRem15,
	componentsIconSize: sysBaseSizes.baseRem15,
	componentsButtonSmallMinHeight: "2.125rem",
	componentsButtonMediumMinHeight: "2.5rem",
	contentPt: sysBaseSizes.baseFixed2,
	contentPb: sysBaseSizes.baseFixed4,
	contentPx: "8.5rem",
	spacingFixedXs: sysBaseSizes.baseFixed025,
	spacingFixedSm: sysBaseSizes.baseFixed050,
	spacingFixedMd: sysBaseSizes.baseFixed1,
	spacingFixedLg: sysBaseSizes.baseFixed15,
	spacingFixedXl: sysBaseSizes.baseFixed2,
	spacingRemXs: sysBaseSizes.baseRem025,
	spacingRemSm: sysBaseSizes.baseRem050,
	spacingRemMd: sysBaseSizes.baseRem1,
	spacingRemLg: sysBaseSizes.baseRem15,
	spacingRemXl: sysBaseSizes.baseRem2,
	radiusSm: sysBaseSizes.baseFixed050,
	radiusMd: sysBaseSizes.baseFixed1,
	radiusLg: sysBaseSizes.baseFixed15,
	radiusXl: sysBaseSizes.baseFixed2,
	radiusInfinite: "800px",
};

/* Typography */
const fontFamily = "'Poppins', sans-serif"
const h1 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${3 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const h2 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${2 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const h3 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${1.5 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const h4 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${1.5 * _fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const h5 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${1.25 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const h6 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${1.25 * _fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const sutitle1 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${_fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const subtitle2 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${0.875 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const button = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${_fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const button2 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${0.875 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const link = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${_fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	textDecorationLine: 'underline',
});

const body1 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${_fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const body2 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${0.875 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

const caption = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${0.75 * _fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
});

// Outros
const containerHome = {
	marginTop: '2em'
};

const logo = {
	maxWidth: 100
};

const column = {
	flex: 0.5
};

const fieldContainer: React.CSSProperties = {
	padding: 0,
	paddingBottom: 0
};

const boxShadowFab = {
	boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.20), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)'
};

export {
	//Colors
	sysBaseColors,

	//Sizing
	sysBaseSizes,
	sysSizing,

	//Typography
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	sutitle1,
	subtitle2,
	button,
	button2,
	link,
	body1,
	body2,
	caption,

	//Outros
	containerHome,
	column,
	logo,
	fieldContainer,

	//Sombras
	boxShadowFab,
}