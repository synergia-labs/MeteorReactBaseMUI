import { ElementType } from 'react';
import { Box, BoxProps, styled } from '@mui/material';
import { sysSizing } from '/imports/ui/materialui/styles';
import {SysSectionPaddingXY} from "/imports/ui/layoutComponents/sysLayoutComponents";

interface IExampleListStyles {
	container: ElementType<BoxProps>;
	loadingContainer: ElementType<BoxProps>;
	searchContainer: ElementType<BoxProps>;
}

const ExampleListStyles: IExampleListStyles = {
	container: styled(SysSectionPaddingXY)(() => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		height: '100vh',
		overflow: 'auto',
		gap: sysSizing.spacingFixedMd,
    marginBottom: sysSizing.contentFabDistance
	})),
	loadingContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		gap: theme.spacing(2)
	})),
	searchContainer: styled(Box)(({ theme }) => ({
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		maxWidth: '616px',
		gap: sysSizing.spacingFixedMd,
		[theme.breakpoints.down('sm')]: {
			flexDirection: 'column'
		}
	}))
};

export default ExampleListStyles;
