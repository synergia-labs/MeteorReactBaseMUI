import { ElementType } from 'react';
import { Box, BoxProps, IconButton, IconButtonProps, styled } from '@mui/material';
import { sysSizing } from '/imports/ui/materialui/styles';
import {SysSectionPaddingX} from "/imports/ui/layoutComponents/sysLayoutComponents";

interface ISysAppBarStyles {
	Container: ElementType<BoxProps>;
	NavContainer: ElementType<BoxProps>;
	IconButton: ElementType<IconButtonProps>;
}

const SysAppBarStyles: ISysAppBarStyles = {
	Container: styled(SysSectionPaddingX)(({ theme }) => ({
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
		paddingTop: sysSizing.spacingFixedSm,
		paddingBottom: sysSizing.spacingFixedSm,
		gap: sysSizing.spacingFixedMd
	})),
	NavContainer: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		gap: sysSizing.spacingFixedMd,
		flexGrow: 1,
		flexShrink: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
		height: '100%'
	}),
	IconButton: styled(IconButton)(({ theme }) => ({
		color: theme.palette.primary.contrastText,
		'&:focus': {
			color: 'white'
		}
	}))
};

export default SysAppBarStyles;
