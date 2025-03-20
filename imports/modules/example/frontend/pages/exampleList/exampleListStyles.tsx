import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import { SysSectionPaddingXY } from '/imports/ui/layoutComponents/sysLayoutComponents';
import { sysSizing } from '/imports/ui/materialui/styles';

interface IExampleListStyles {
	container: ElementType<BoxProps>;
	filterContainer: ElementType<BoxProps>;
}

const ExampleListStyles: IExampleListStyles = {
	container: styled(SysSectionPaddingXY)({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		width: '100%',
		gap: sysSizing.spacingFixedMd,
		marginBottom: '60px'
	}),
	filterContainer: styled(Box)({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-start',
		gap: sysSizing.spacingFixedMd
	})
};

export default ExampleListStyles;
