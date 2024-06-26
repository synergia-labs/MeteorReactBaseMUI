import { ElementType } from 'react';
import { Box, BoxProps, IconButton, IconButtonProps, styled } from '@mui/material';
import { sysSizing } from '/imports/ui/materialui/styles';

interface ISysAppBarStyles {
	container: ElementType<BoxProps>;
	navContainer: ElementType<BoxProps>;
	iconButton: ElementType<IconButtonProps>;
}

const SysAppBarStyles: ISysAppBarStyles = {
	container: styled(Box)(({ theme }) => ({
		width: '100%',
		height: '56px',
		overflow: 'hidden',
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexShrink: 0,
		transition: 'all 0.3s ease',
		padding: `${sysSizing.spacingFixedSm} ${sysSizing.spacingFixedMd}`,
		gap: sysSizing.spacingFixedMd,
		[theme.breakpoints.up('sm')]: {
			padding: `${sysSizing.spacingFixedSm} ${sysSizing.contentPx}`
		}
	})),
	navContainer: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		gap: sysSizing.spacingFixedMd,
		flexGrow: 1,
		flexShrink: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: '100%'
	}),
	iconButton: styled(IconButton)(({ theme }) => ({
		color: theme.palette.primary.contrastText,
		'&:focus': {
			color: 'white'
		}
	}))
};

export default SysAppBarStyles;
