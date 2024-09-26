import React, { ElementType } from 'react';
import { Avatar, AvatarProps, Box, BoxProps, styled, Theme } from '@mui/material';
import { sysSizing } from '../../materialui/styles';

interface ISysAvatarStyles {
	Container: ElementType<BoxProps & IContainer>;
	Avatar: ElementType<AvatarProps>;
}

interface IContainer {
	activeOnClick?: boolean;
	borderColor?: string;
}

const SysAvatarStyles: ISysAvatarStyles = {
	Container: styled(({ activeOnClick, borderColor, ...otherProps }: IContainer) => <Box {...otherProps} />)<IContainer>(
		({ theme, activeOnClick, borderColor }: { theme?: Theme; activeOnClick?: boolean; borderColor?: string }) => ({
			width: sysSizing.componentsButtonMediumMinHeight,
			height: sysSizing.componentsButtonMediumMinHeight,
			borderRadius: '50%',
			border: `2px solid ${borderColor ?? theme?.palette.common.white}`,
			boxSizing: 'border-box',
			display: 'flex',
			overflow: 'hidden',
			alignItems: 'center',
			justifyContent: 'center',
			padding: sysSizing.componentsInputMinHeight,
			cursor: activeOnClick ? 'pointer' : 'default',
			flexShrink: 0
		})
	),
	Avatar: styled(Avatar)(({ theme }) => ({
		width: sysSizing.contentPt,
		height: sysSizing.contentPt,
		backgroundColor: theme?.palette.primary.dark,
		transition: 'all 150ms linear',
		'&:hover': {
			backgroundColor: theme?.palette.sysAction?.primaryContrastText,
			color: theme.palette.sysAction?.primaryHover,
			transition: 'all 150ms linear'
		},
		'&:focus': {
			backgroundColor: theme?.palette.sysAction?.primaryContrastText,
			color: theme?.palette.sysAction?.primaryHover,
			outline: 'none',
			transition: 'all 150ms linear'
		}
	}))
};

export default SysAvatarStyles;
