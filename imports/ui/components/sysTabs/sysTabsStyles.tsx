import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box, styled } from '@mui/material';

interface IContainer {
	orientation?: 'horizontal' | 'vertical';
}

const SysTabsStyles = {
	container: styled(Box)<IContainer>(({ theme, orientation }) => ({
		borderRight: orientation === 'vertical' ? '1px solid' : 'none',
		borderBottom: orientation === 'horizontal' ? '1px solid' : 'none',
		borderColor: theme.palette.divider,
		width: 'auto',
		maxWidth: '100%'
	})),

	tabs: styled(Tabs)(({ theme }) => ({})),

	tab: styled(Tab)(({ theme }) => ({}))
};

export default SysTabsStyles;
