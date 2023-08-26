/*!
 
 =========================================================
 * Material Dashboard React - v1.0.0 based on Material Dashboard - v1.2.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2018 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

import React from 'react';

/////////////////////////////////////////////// Paleta de cores do prototipo de alta /////////////////////////////////
const primary = '#5a9902';
const onPrimary = '#FFFFFF';
const primaryContainer = '#9DE4D6';
const onPrimaryContainer = '#034944';
const primaryOnHover = 'rgba(0, 126, 122, 0.1)';

const secondary = '#2182C0';
const onSecondary = '#034944';
const secondaryContainer = '#FFDD99';
const onSecondaryContainer = '#034944';
const secondaryOnHover = 'rgba(236, 177, 31, 0.2)';

const error = '#B30501';
const onError = '#FFFFFF';
const errorContainer = '#F7C0BF';
const onErrorContainer = '#B30501';

const background = '#F0F2FB';
const onBackground = '#404040';
const buttonOnHover = '#006B68';

const primaryGradient = 'linear-gradient(180deg, #0ABB98 0%, #08AE92 45.83%, #06A28B 69.27%, #007E7A 100%)';
const secondaryGradient = 'linear-gradient(180deg, #034944 0%, #007E7A 100%)';

const greenBackground = 'rgba(3, 73, 68, 0.75)';
const activeBackground = 'rgba(0, 126, 122, 0.25)';
const lightHover = 'rgba(255, 255, 255, 0.2)';
const surface = '#FFFFFF';
const onSurface = '#404040';
const surfaceVariant = '#DAE5E3';
const onSurfaceVariant = '#303030';
const outline = '#6F7978';

//cinzas
const preto = '#000000';
const cinza10 = '#1C1C1C';
const cinza20 = '#282828';
const cinza30 = '#404040';
const cinza40 = '#555555';
const cinza50 = '#777777';
const cinza60 = '#909090';
const cinza70 = '#ACACAC';
const cinza80 = '#BCBEC0';
const cinza90 = '#E6E7E8';
const cinza95 = '#EFF1F0';
const cinza98 = '#F7FBF9';

//primarias
const aquaVale = '#0ABB98';
const amareloVale = '#ECB11F';
const cerejaVale = '#C0305E';
const laranjaVale = '#E37222';
const azulVale = '#3CB5E5';
const cinzaEscuro = '#555555';
const branco = '#FFFFFF';
const verdeVale = '#007E7A';

//secundarias
const verdeEscuro = '#034944';
const aquaClaro = '#9DE4D6';
const azulEscuro = '#2626D1';
const amareloClaro = '#FFDD99';
const cerejaEscuro = '#991310';
const cerejaClaro = '#E191C5';
const cinzaClaro = '#E6E7E8';
const cinzaMedio = '#BCBEC0';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const darkPalette = {
	primary: '#307000',
	onPrimary: '#000000',
	primaryContainer: '#034944',
	onPrimaryContainer: '#9DE4D6',
	primaryOnHover: 'rgba(10, 187, 152, 0.1)',

	secondary: '#0272BA',
	onSecondary: '#000000',
	secondaryContainer: '#034944',
	onSecondaryContainer: '#ECB11F',
	secondaryOnHover: 'rgba(255, 221, 153, 0.2)',

	error: '#F7C0BF',
	onError: '#000000',
	errorContainer: '#B30501',
	onErrorContainer: '#FFFFFF',

	background: '#404040',
	onBackground: '#FFFFFF',
	buttonOnHover: '#0ABB98',

	primaryGradient: 'linear-gradient(180deg, #034944 0%, #0ABB98 100%)',
	secondaryGradient: 'linear-gradient(180deg, #007E7A 0%, #034944 100%)',

	greenBackground: 'rgba(0, 126, 122, 0.75)',
	activeBackground: 'rgba(10, 187, 152, 0.25)',
	lightHover: 'rgba(0, 0, 0, 0.2)',
	surface: '#404040',
	onSurface: '#FFFFFF',
	surfaceVariant: '#303030',
	onSurfaceVariant: '#FFFFFF',
	outline: '#555555',

	preto: '#FFFFFF',
	cinza10: '#E6E6E6',
	cinza20: '#CCCCCC',
	cinza30: '#B3B3B3',
	cinza40: '#999999',
	cinza50: '#808080',
	cinza60: '#666666',
	cinza70: '#4D4D4D',
	cinza80: '#333333',
	cinza90: '#1A1A1A',
	cinza95: '#0D0D0D',
	cinza98: '#060606',

	aquaVale: '#034944',
	amareloVale: '#034944',
	cerejaVale: '#FFFFFF',
	laranjaVale: '#FFFFFF',
	azulVale: '#FFFFFF',
	cinzaEscuro: '#CCCCCC',
	branco: '#000000',
	verdeVale: '#0ABB98',

	verdeEscuro: '#0ABB98',
	aquaClaro: '#034944',
	azulEscuro: '#FFFFFF',
	amareloClaro: '#034944',
	cerejaEscuro: '#F7C0BF',
	cerejaClaro: '#B30501',
	cinzaClaro: '#1A1A1A',
	cinzaMedio: '#333333'
};

//////////////////////////////////////////////////// Tipografia /////////////////////////////////////////////////////

//Família de Fontes
const fontFamily = "'ValeSans', sans-serif";

// Tipografia
const displayLarge = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${3 * _fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '-0.02em'
});

const displayMedium = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${2.5 * _fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '-0.02em'
});

const displaySmall = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${2 * _fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '-0.015em'
});

const headlineLarge = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${2 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '-0.01em'
});

const headlineMedium = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${1.75 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal'
});

const headlineSmall = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${1.5 * _fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal'
});

const titleLarge = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${1.25 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal'
});

const titleMedium = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${1.25 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal'
});

const titleSmall = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${1.125 * _fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal'
});

const labelLarge = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${1 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.005em'
});

const labelMedium = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${0.875 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.015em'
});

const labelSmall = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${0.75 * _fontScale}rem`,
	fontWeight: 600,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.02em'
});

const bodyLarge = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${1 * _fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.01em'
});

const bodyMedium = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${0.875 * _fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.015em'
});

const bodySmall = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${0.75 * _fontScale}rem`,
	fontWeight: 400,
	fontStyle: 'normal',
	lineHeight: 'normal',
	letterSpacing: '0.02em'
});

//Tipografia básica com escala
const h1 = (_fontScale: number = 1) => ({
	fontFamily: fontFamily,
	fontSize: `${(74 / 16) * _fontScale}rem`,
	fontWeight: 700,
	lineHeight: `${84 / 16}rem`,
	letterSpacing: '0.02rem',
	'@media screen and (max-width: 1367px)': {
		fontSize: `${(58 / 16) * _fontScale}rem`,
		lineHeight: `${68 / 16}rem`
	},
	'@media screen and (max-width: 600px)': {
		fontSize: `${(44 / 16) * _fontScale}rem`,
		lineHeight: `${54 / 16}rem`
	}
});

const h2 = (_fontScale: number = 1) => ({
	fontFamily: 'fontFamily',
	fontSize: `${(74 / 16) * _fontScale}rem`,
	fontWeight: 300,
	lineHeight: `${84 / 16}rem`,
	letterSpacing: '0.02rem',
	'@media screen and (max-width: 1367px)': {
		fontSize: `${(58 / 16) * _fontScale}rem`,
		lineHeight: `${68 / 16}rem`
	},
	'@media screen and (max-width: 600px)': {
		fontSize: `${(44 / 16) * _fontScale}rem`,
		lineHeight: `${54 / 16}rem`
	}
});

const h3 = (_fontScale: number = 1) => ({
	fontFamily: 'fontFamily',
	fontSize: `${(58 / 16) * _fontScale}rem`,
	fontWeight: 700,
	lineHeight: `${66 / 16}rem`,
	letterSpacing: '0.02rem',
	'@media screen and (max-width: 1367px)': {
		fontSize: `${(42 / 16) * _fontScale}rem`,
		lineHeight: `${50 / 16}rem`
	},
	'@media screen and (max-width: 600px)': {
		fontSize: `${(28 / 16) * _fontScale}rem`,
		lineHeight: `${36 / 16}rem`
	}
});
const h4 = (_fontScale: number = 1) => ({
	fontSize: `${(58 / 16) * _fontScale}rem`,
	fontWeight: 300,
	lineHeight: `${66 / 16}rem`,
	letterSpacing: '0.02rem',
	'@media screen and (max-width: 1367px)': {
		fontSize: `${(42 / 16) * _fontScale}rem`,
		lineHeight: `${50 / 16}rem`
	},
	'@media screen and (max-width: 600px)': {
		fontSize: `${(28 / 16) * _fontScale}rem`,
		lineHeight: `${36 / 16}rem`
	}
});

const h5 = (_fontScale: number = 1) => ({
	fontFamily: 'fontFamily',
	fontSize: `${(46 / 16) * _fontScale}rem`,
	fontWeight: 600,
	lineHeight: `${56 / 16}rem`,
	'@media screen and (max-width: 1367px)': {
		fontSize: `${(32 / 16) * _fontScale}rem`,
		lineHeight: `${42 / 16}rem`
	},
	'@media screen and (max-width: 600px)': {
		fontSize: `${(24 / 16) * _fontScale}rem`,
		lineHeight: `${34 / 16}rem`
	}
});

const h6 = (_fontScale: number = 1) => ({
	fontFamily: 'fontFamily',
	fontSize: `${(42 / 16) * _fontScale}rem`,
	fontWeight: 700,
	lineHeight: `${52 / 16}rem`,
	letterSpacing: '0.02rem',
	'@media screen and (max-width: 1367px)': {
		fontSize: `${(28 / 16) * _fontScale}rem`,
		lineHeight: `${38 / 16}rem`
	},
	'@media screen and (max-width: 600px)': {
		fontSize: `${(21 / 16) * _fontScale}rem`,
		lineHeight: `${31 / 16}rem`
	}
});

const h7 = (_fontScale: number = 1) => ({
	fontFamily: 'fontFamily',
	fontSize: `${(42 / 16) * _fontScale}rem`,
	fontWeight: 300,
	lineHeight: `${52 / 16}rem`,
	letterSpacing: '0.02rem',
	'@media screen and (max-width: 1367px)': {
		fontSize: `${(28 / 16) * _fontScale}rem`,
		lineHeight: `${38 / 16}rem`
	},
	'@media screen and (max-width: 600px)': {
		fontSize: `${(21 / 16) * _fontScale}rem`,
		lineHeight: `${31 / 16}rem`
	}
});

const h8 = (_fontScale: number = 1) => ({
	fontFamily: 'fontFamily',
	fontSize: `${(32 / 16) * _fontScale}rem`,
	fontWeight: 600,
	lineHeight: `${40 / 16}rem`,
	letterSpacing: '0.02rem',
	'@media screen and (max-width: 1367px)': {
		fontSize: `${(24 / 16) * _fontScale}rem`,
		lineHeight: `${32 / 16}rem`
	},
	'@media screen and (max-width: 600px)': {
		fontSize: `${(18 / 16) * _fontScale}rem`,
		lineHeight: `${24 / 16}rem`
	}
});

const h9 = (_fontScale: number = 1) => ({
	fontFamily: 'fontFamily',
	fontSize: `${(32 / 16) * _fontScale}rem`,
	fontWeight: 300,
	lineHeight: `${40 / 16}rem`,
	letterSpacing: '0.02rem',
	'@media screen and (max-width: 1367px)': {
		fontSize: `${(24 / 16) * _fontScale}rem`,
		lineHeight: `${32 / 16}rem`
	},
	'@media screen and (max-width: 600px)': {
		fontSize: `${(18 / 16) * _fontScale}rem`,
		lineHeight: `${24 / 16}rem`
	}
});

const h10 = (_fontScale: number = 1) => ({
	fontFamily: 'fontFamily',
	fontSize: `${(24 / 16) * _fontScale}rem`,
	fontWeight: 600,
	lineHeight: `${29 / 16}rem`,
	letterSpacing: '0.02rem',
	'@media screen and (max-width: 1367px)': {
		fontSize: `${(17 / 16) * _fontScale}rem`,
		lineHeight: `${22 / 16}rem`
	},
	'@media screen and (max-width: 600px)': {
		fontSize: `${(13 / 16) * _fontScale}rem`,
		lineHeight: `${18 / 16}rem`
	}
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Sombras
const cardShadow = '0px 2px 5px 1px rgba(0, 0, 0, 0.1)';
const appbarShadow = '0px 1px 3px rgba(0, 0, 0, 0.1)';

// Outros
const containerHome = {
	marginTop: '2em'
};

const row = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap'
};

const form = {
	display: 'flex',
	flexDirection: 'column',
	paddingTop: 20, //isMobile ? 40 : 40,
	marginBottom: 40,
	paddingBottom: 100
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

export {
	//Paleta
	darkPalette,
	primary,
	onPrimary,
	primaryContainer,
	onPrimaryContainer,
	primaryOnHover,
	secondary,
	onSecondary,
	secondaryContainer,
	onSecondaryContainer,
	secondaryOnHover,
	error,
	onError,
	errorContainer,
	onErrorContainer,
	background,
	onBackground,
	buttonOnHover,
	primaryGradient,
	secondaryGradient,
	greenBackground,
	activeBackground,
	lightHover,
	surface,
	onSurface,
	surfaceVariant,
	onSurfaceVariant,
	outline,

	//cinzas
	preto,
	cinza10,
	cinza20,
	cinza30,
	cinza40,
	cinza50,
	cinza60,
	cinza70,
	cinza80,
	cinza90,
	cinza95,
	cinza98,

	//primarias
	aquaVale,
	amareloVale,
	cerejaVale,
	laranjaVale,
	azulVale,
	cinzaEscuro,
	branco,
	verdeVale,

	//secundarias
	verdeEscuro,
	aquaClaro,
	azulEscuro,
	amareloClaro,
	cerejaEscuro,
	cerejaClaro,
	cinzaClaro,
	cinzaMedio,

	//Tipografia
	fontFamily,
	displayLarge,
	displayMedium,
	displaySmall,
	headlineLarge,
	headlineMedium,
	headlineSmall,
	titleLarge,
	titleMedium,
	titleSmall,
	labelLarge,
	labelMedium,
	labelSmall,
	bodyLarge,
	bodyMedium,
	bodySmall,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	h7,
	h8,
	h9,
	h10,

	//Sombras
	cardShadow,
	appbarShadow,

	//Outros
	containerHome,
	row,
	column,
	form,
	logo,
	fieldContainer
};
