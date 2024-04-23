import { ElementType } from 'react';
import { Box, BoxProps, styled, Typography, TypographyProps } from '@mui/material';
import { sysSizing } from '/imports/ui/materialui/styles';

interface ISysFormPlaygroundStyles {
	container: ElementType<BoxProps>;
	description: ElementType<TypographyProps>;
	playground: ElementType<BoxProps>;
	formContainer: ElementType<BoxProps>;
	controlerContainer: ElementType<BoxProps>;
	docContainer: ElementType<BoxProps>;
	buttonContainer: ElementType<BoxProps>;
	rowElement: ElementType<BoxProps>;
	schemaContainer: ElementType<BoxProps>;
}

const SysFormPlaygroundStyles: ISysFormPlaygroundStyles = {
	container: styled(Box)(({ theme }) => ({
		padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
		paddingBottom: sysSizing.contentPb,
		transition: 'all 0.3s ease',
		gap: sysSizing.spacingFixedMd,
		display: 'flex',
		flexDirection: 'column',
		[theme.breakpoints.down('sm')]: {
			padding: `${sysSizing.contentPt} ${sysSizing.spacingFixedMd}`
		}
	})),
	description: styled(Typography)({
		textAlign: 'justify',
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedSm
	}),
	playground: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		gap: '64px'
	}),
	formContainer: styled(Box)({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedMd,
		width: '50%',
		position: 'sticky',
		top: '16px',
		height: 'fit-content'
	}),
	controlerContainer: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedLg,
		width: '50%',
		borderRadius: sysSizing.radiusSm,
		padding: sysSizing.spacingFixedMd,
		backgroundColor: theme.palette.sysAction?.primaryBgHover,
		height: 'fit-content'
	})),
	docContainer: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: theme.palette.sysBackground?.default,
		borderRadius: sysSizing.radiusSm,
		minHeight: '157px',
		maxHeight: '350px',
		padding: sysSizing.spacingFixedMd
	})),
	buttonContainer: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		rowGap: sysSizing.spacingRemMd,
		columnGap: sysSizing.spacingRemMd
	}),
	rowElement: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		gap: sysSizing.spacingFixedMd,
		alignItems: 'flex-start'
	}),
	schemaContainer: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		borderRadius: sysSizing.radiusSm,
		padding: sysSizing.spacingFixedMd,
		backgroundColor: theme.palette.sysBackground?.default,
		border: `1px solid ${theme.palette.divider}`,
		overflow: 'auto'
	}))
};

export default SysFormPlaygroundStyles;
