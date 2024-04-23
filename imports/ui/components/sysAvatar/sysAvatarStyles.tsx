import { ElementType } from 'react';
import { Avatar, AvatarProps, Box, BoxProps, styled, Theme } from '@mui/material';
import { sysSizing } from '/imports/ui/materialui/styles';

interface ISysAvatarStyles {
	container: ElementType<BoxProps & IContainer>;
	avatar: ElementType<AvatarProps>;
}

interface IContainer {
	activeOnClick?: boolean;
	borderColor?: string;
}

const SysAvatarStyles: ISysAvatarStyles = {
	container: styled(Box)<IContainer>(
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
	avatar: styled(Avatar)(({ theme }) => ({
		width: sysSizing.contentPt,
		height: sysSizing.contentPt,
		backgroundColor: theme?.palette.primary.dark,
		'&:hover': {
			backgroundColor: theme?.palette.sysAction?.primaryContrastText,
			color: theme.palette.sysAction?.primaryHover
		},
		'&:focus': {
			backgroundColor: theme?.palette.sysAction?.primaryContrastText,
			color: theme?.palette.sysAction?.primaryHover,
			outline: 'none'
		}
	}))
};

export default SysAvatarStyles;
