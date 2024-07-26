import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

interface IContainer {
	orientation?: 'horizontal' | 'vertical';
}

const SysTabsStyles = {
	Container: styled(Box)<IContainer>(({ theme, orientation }) => ({
		borderRight: orientation === 'vertical' ? '1px solid' : 'none',
		borderBottom: orientation === 'horizontal' ? '1px solid' : 'none',
		borderColor: theme.palette.divider,
		width: 'auto',
		maxWidth: '100%'
	})),

	Tabs: styled(Tabs)(({ theme }) => ({})),

	Tab: styled(Tab)(({ theme }) => ({}))
};

export default SysTabsStyles;
