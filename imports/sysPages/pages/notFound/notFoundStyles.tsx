import { ElementType } from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

interface INotFoundStyles {
	Container: ElementType<BoxProps>;
}

const NotFoundStyles: INotFoundStyles = {
	Container: styled(Box)(() => ({
		display: 'flex',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		padding: '20px'
	}))
};

export default NotFoundStyles;
