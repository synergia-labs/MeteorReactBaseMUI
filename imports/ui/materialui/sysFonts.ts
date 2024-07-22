import { TypographyOptions } from '@mui/material/styles/createTypography';

class SysFonts {
	public static readonly fontFamily = 'Poppins, sans-serif';

	public static readonly h1 = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${3 * _fontScale}rem`,
		fontWeight: 600,
    fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly h2 = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${2 * _fontScale}rem`,
		fontWeight: 600,
    fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly h3 = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${1.5 * _fontScale}rem`,
		fontWeight: 600,
    fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly h4 = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${1.5 * _fontScale}rem`,
		fontWeight: 400,
    fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly h5 = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${1.25 * _fontScale}rem`,
		fontWeight: 600,
    fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly h6 = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${1.125 * _fontScale}rem`,
		fontWeight: 400,
    fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly subtitle1 = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${_fontScale}rem`,
		fontWeight: 600,
		fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly subtitle2 = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${0.875 * _fontScale}rem`,
		fontWeight: 600,
		fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly button = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${_fontScale}rem`,
		fontWeight: 600,
		fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly button2 = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${0.875 * _fontScale}rem`,
		fontWeight: 600,
		fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly link = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${_fontScale}rem`,
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: 'normal',
		textDecorationLine: 'underline'
	});

	public static readonly body1 = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${_fontScale}rem`,
    fontWeight: 400,
		fontStyle: 'normal',
    lineHeight: 'normal'
	});

	public static readonly body2 = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${0.875 * _fontScale}rem`,
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly caption = (_fontScale: number = 1) => ({
		fontFamily: SysFonts.fontFamily,
		fontSize: `${0.75 * _fontScale}rem`,
		fontWeight: 400,
		fontStyle: 'normal',
		lineHeight: 'normal'
	});

	public static readonly getTypography = (_fontScale: number = 1): TypographyOptions => ({
		fontFamily: SysFonts.fontFamily,
		h1: SysFonts.h1(_fontScale),
		h2: SysFonts.h2(_fontScale),
		h3: SysFonts.h3(_fontScale),
		h4: SysFonts.h4(_fontScale),
		h5: SysFonts.h5(_fontScale),
		h6: SysFonts.h6(_fontScale),
		subtitle1: SysFonts.subtitle1(_fontScale),
		subtitle2: SysFonts.subtitle2(_fontScale),
		button: SysFonts.button(_fontScale),
		button2: SysFonts.button2(_fontScale),
		link: SysFonts.link(_fontScale),
		body1: SysFonts.body1(_fontScale),
		body2: SysFonts.body2(_fontScale),
		caption: SysFonts.caption(_fontScale)
	});
}

export default SysFonts;
