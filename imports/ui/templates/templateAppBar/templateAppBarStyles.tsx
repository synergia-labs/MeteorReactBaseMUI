import { ElementType } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface ITemplateAppBarStyles {
	Container: ElementType<BoxProps>;
	ContentContainer: ElementType<BoxProps>;
}

const TemplateAppBarStyles: ITemplateAppBarStyles = {
	Container: styled(Box)({
		display: 'flex',
		flexDirection: 'column',
		width: '100vw',
		height: '100vh',
		overflow: 'hidden'
	}),
	ContentContainer: styled(Box)({
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		overflow: 'auto'
	})
};

export default TemplateAppBarStyles;
