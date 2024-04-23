import { ElementType } from 'react';
import { Box, BoxProps, styled } from '@mui/material';
import { sysSizing } from '/imports/ui/materialui/styles';

interface IExampleListStyles {
	container: ElementType<BoxProps>;
	loadingContainer: ElementType<BoxProps>;
	searchContainer: ElementType<BoxProps>;
}

const ExampleListStyles: IExampleListStyles = {
	container: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '100%',
		height: '100vh',
		overflow: 'auto',
		padding: `${sysSizing.contentPt} ${sysSizing.contentPx}`,
		gap: sysSizing.spacingFixedMd,
		transition: 'all 0.3s ease',
		[theme.breakpoints.down('sm')]: {
			padding: `${sysSizing.contentPt} ${sysSizing.spacingFixedMd}`
		}
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
