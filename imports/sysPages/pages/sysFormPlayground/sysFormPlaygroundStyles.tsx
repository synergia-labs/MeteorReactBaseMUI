import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import { sysSizing } from '/imports/ui/materialui/styles';
import {SysSectionPaddingXY} from "/imports/ui/layoutComponents/sysLayoutComponents";

interface ISysFormPlaygroundStyles {
	Container: ElementType<BoxProps>;
	Description: ElementType<BoxProps>;
	Playground: ElementType<BoxProps>;
	FormContainer: ElementType<BoxProps>;
	ControlerContainer: ElementType<BoxProps>;
	DocContainer: ElementType<BoxProps>;
	ButtonContainer: ElementType<BoxProps>;
	RowElement: ElementType<BoxProps>;
	SchemaContainer: ElementType<BoxProps>;
}

const SysFormPlaygroundStyles: ISysFormPlaygroundStyles = {
	Container: styled(SysSectionPaddingXY)(() => ({
		gap: sysSizing.spacingFixedMd,
		display: 'flex',
		flexDirection: 'column',
	})),
	Description: styled(Box)({
		textAlign: 'justify',
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedSm
	}),
	Playground: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		gap: '64px'
	}),
	FormContainer: styled(Box)({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedMd,
		width: '50%',
		position: 'sticky',
		top: '16px',
		height: 'fit-content'
	}),
	ControlerContainer: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedLg,
		width: '50%',
		borderRadius: sysSizing.radiusSm,
		padding: sysSizing.spacingFixedMd,
		backgroundColor: theme.palette.sysAction?.primaryBgHover,
		height: 'fit-content'
	})),
	DocContainer: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: theme.palette.sysBackground?.default,
		borderRadius: sysSizing.radiusSm,
		minHeight: '157px',
		maxHeight: '350px',
		padding: sysSizing.spacingFixedMd
	})),
	ButtonContainer: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		rowGap: sysSizing.spacingRemMd,
		columnGap: sysSizing.spacingRemMd
	}),
	RowElement: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		gap: sysSizing.spacingFixedMd,
		alignItems: 'flex-start'
	}),
	SchemaContainer: styled(Box)(({ theme }) => ({
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
