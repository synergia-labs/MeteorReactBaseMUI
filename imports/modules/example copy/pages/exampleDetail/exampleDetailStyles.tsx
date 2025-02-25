import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { sysSizing } from '../../../../ui/materialui/styles';
import { SysSectionPaddingXY } from '../../../../ui/layoutComponents/sysLayoutComponents';

interface IExampleDetailStyles {
	container: ElementType<BoxProps>;
	header: ElementType<BoxProps>;
	body: ElementType<BoxProps>;
	footer: ElementType<BoxProps>;
	formColumn: ElementType<BoxProps>;
}

const ExampleDetailStyles: IExampleDetailStyles = {
	container: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		gap: sysSizing.spacingFixedMd,
		width: '100%'
	})),
	header: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	}),
	body: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		gap: '64px',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			gap: sysSizing.spacingFixedMd
		}
	})),
	footer: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%',
		gap: sysSizing.spacingRemMd,
		marginTop: '40px'
	}),
	formColumn: styled(Box)({
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		gap: sysSizing.spacingFixedLg
	})
};

export default ExampleDetailStyles;
