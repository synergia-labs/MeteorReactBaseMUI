import { Box, styled, Typography } from '@mui/material';

export const ComplexTableContainer = styled(Box)(() => ({
	width: '100%',
	height: '100%',
	display: 'flex',
}));


export const ComplexTableRenderImg = styled("img")(() => ({
	maxHeight: '50%',
	maxWidth: '50%',
	borderRadius: '50%'
}));

export const ComplexTableRowText= styled(Typography)(() => ({
	color: 'sysText.body',
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
}));
