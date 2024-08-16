import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface ISysLabelViewStyles {
	Container: ElementType<BoxProps>;
	Header: ElementType<BoxProps>;
	HelpIcon: ElementType<IHelpIconProps>;
}

interface IHelpIconProps {
	disabled?: boolean | undefined;
}

const SysLabelViewStyles: ISysLabelViewStyles = {
	Container: styled(Box)(() => ({
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		gap: '4px'
	})),
	Header: styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		gap: '4px'
	})),
};

export default SysLabelViewStyles;
