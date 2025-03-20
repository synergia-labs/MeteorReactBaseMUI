import React, { ElementType } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import styled from '@mui/material/styles/styled';

interface IStyles {
	container: ElementType<BoxProps>;
	content: ElementType<BoxProps>;
	footer: ElementType<BoxProps>;
}

const baseUserEmailsStyles: IStyles = {
	container: styled(Box)(({ theme }) => ({
		backgroundColor: theme.palette.sysBackground?.bg2,
		padding: theme.spacing(2)
	})),
	content: styled(Box)(({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2),
		borderRadius: theme.shape.borderRadius * 2,
		width: '100%',
		maxWidth: '700px',
		border: `1px solid ${theme.palette.sysBackground?.bg3}`,
		margin: `${theme.spacing(4)} auto`
	})),
	footer: styled(Box)({
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column'
	})
};

export default baseUserEmailsStyles;
