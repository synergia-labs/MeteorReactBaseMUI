import { TypographyOptions } from '@mui/material/styles/createTypography';

class ProdFonts {
	public static readonly fontFamily = 'Noto Sans, Noto Sans JP';

	public static readonly h1 = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${5.625 * _fontScale}rem`, //96px
		fontWeight: 300,
		fontStyle: 'light',
		lineHeight: '130.75px'
	});

	public static readonly h2 = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${3.75 * _fontScale}rem`, //60px
		fontWeight: 300,
		fontStyle: 'light',
		lineHeight: '81.72px'
	});

	public static readonly h3 = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${3 * _fontScale}rem`,
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: '65.38px'
	});

	public static readonly h4 = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${2.125 * _fontScale}rem`, //34px
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: '46.31px'
	});

	public static readonly h5 = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${1.5 * _fontScale}rem`, //24px
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: '32.69px'
	});

	public static readonly h6 = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${1.25 * _fontScale}rem`, //20px
		fontWeight: 500,
		fontStyle: 'bold',
		lineHeight: '27.24px'
	});

	public static readonly subtitle1 = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${_fontScale}rem`, //16px
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: '21.79px'
	});

	public static readonly subtitle2 = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${0.875 * _fontScale}rem`, //14px
		fontWeight: 500,
		fontStyle: 'bold',
		lineHeight: '19.07px'
	});

	public static readonly button = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${_fontScale}rem`, //16px
		fontWeight: 500,
		fontStyle: 'bold',
		lineHeight: '21.79px'
	});

	public static readonly button2 = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${0.875 * _fontScale}rem`, //14px
		fontWeight: 500,
		fontStyle: 'bold',
		lineHeight: '19.07px'
	});

	public static readonly link = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${_fontScale}rem`,
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: 'normal',
		textDecorationLine: 'underline'
	});

	public static readonly body1 = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${_fontScale}rem`, //16px
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: '21.79px'
	});

	public static readonly body2 = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${0.875 * _fontScale}rem`, //14px
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: '19.07px'
	});

	public static readonly caption = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${0.75 * _fontScale}rem`, //12px
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: '16.34px'
	});

	public static readonly overline = (_fontScale: number = 1) => ({
		fontFamily: ProdFonts.fontFamily,
		fontSize: `${0.625 * _fontScale}rem`, //10px
		fontWeight: 500,
		fontStyle: 'normal',
		lineHeight: '13.62px'
	});

	public static readonly getTypography = (_fontScale: number = 1): TypographyOptions => ({});
}

export default ProdFonts;
