import React, { ElementType } from 'react';
import { styled, Box, BoxProps } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface ISysLabelViewStyles {
	container: ElementType<BoxProps>;
	header: ElementType<BoxProps>;
	helpIcon: ElementType<IHelpIconProps>;
}

interface IHelpIconProps {
	disabled?: boolean | undefined;
}

const SysLabelViewStyles: ISysLabelViewStyles = {
	container: styled(Box)(() => ({
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: '4px'
	})),
	header: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: '4px'
	})),
	helpIcon: styled(HelpOutlineIcon)<IHelpIconProps>(({ theme, disabled }) => ({
		fontSize: theme.typography.body2.fontSize,
		color: disabled ? theme.palette.sysText?.disabled : theme.palette.sysText?.auxiliary
	}))
};

export default SysLabelViewStyles;
