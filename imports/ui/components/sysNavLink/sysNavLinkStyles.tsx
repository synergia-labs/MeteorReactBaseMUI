import React from 'react';
import { Box, BoxProps, styled } from '@mui/material';
import { sysSizing } from '../../materialui/styles';

interface ISysNavLinkStyles {
	container: React.ElementType<BoxProps & IContainer>;
}

interface IContainer {
	active: boolean;
}

const SysNavLinkStyles: ISysNavLinkStyles = {
	container: styled(Box)<IContainer>(({ theme, active }) => ({
		padding: `${sysSizing.spacingRemXs} ${sysSizing.spacingRemMd}`,
		borderRadius: sysSizing.radiusInfinite,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: theme.spacing(1),
		cursor: 'pointer',
		backgroundColor: active ? theme.palette.sysAction?.primaryHover : undefined,
		transition: 'all 0.3s ease',

		'&:hover': {
			backgroundColor: theme.palette.sysAction?.primaryHover,
			boxShadow: active ? theme.shadows[1] : undefined
		}
	}))
};

export default SysNavLinkStyles;
