import { ElementType } from 'react';
import { Box, BoxProps, styled } from '@mui/material';
import { sysSizing } from '../../materialui/styles';

interface ISysMenuStyles {
	container: ElementType<BoxProps>;
	menuAccountStyles: Object;
	menuItem: ElementType<BoxProps>;
}

const SysMenuStyles: ISysMenuStyles = {
	container: styled(Box)({
		padding: sysSizing.spacingFixedMd,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: sysSizing.spacingFixedMd,
		minWidth: '250px'
	}),
	menuAccountStyles: {
		elevation: 0,
		sx: {
			overflow: 'visible',
			filter: 'drop-shadow(0px 1px 4px rgba(0,0,0,0.2))',
			mt: 1.5,
			borderRadius: sysSizing.radiusMd,
			'& .MuiAvatar-root': {
				width: 32,
				height: 32,
				ml: -0.5,
				mr: 1
			},
			'&::before': {
				content: '""',
				display: 'block',
				position: 'absolute',
				top: 0,
				right: 14,
				width: 10,
				height: 10,
				bgcolor: 'background.paper',
				transform: 'translateY(-50%) rotate(45deg)',
				zIndex: 0
			}
		}
	},
	menuItem: styled(Box)(({ theme }) => ({
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: theme.spacing(1),
		width: '100%',
		padding: `${sysSizing.spacingRemSm} 0`,
		borderRadius: sysSizing.radiusXs,
		cursor: 'pointer',

		'&:hover': {
			backgroundColor: theme.palette.action.hover
		},

		'& .MuiSvgIcon-root': {
			color: theme.palette.primary.main
		}
	}))
};

export default SysMenuStyles;
