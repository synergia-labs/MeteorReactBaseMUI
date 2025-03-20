import React, { ElementType } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import styled from '@mui/material/styles/styled';

interface IStyles {
	buttonContainer: ElementType<BoxProps>;
}

const sendEmailResetPasswordStyles: IStyles = {
	buttonContainer: styled(Box)(({ theme }) => ({
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		padding: theme.spacing(1),
		borderRadius: theme.shape.borderRadius * 2,
		minWidth: '200px',
		maxWidth: '250px',
		textAlign: 'center',
		cursor: 'pointer',
		margin: `${theme.spacing(10)} auto`
	}))
};

export default sendEmailResetPasswordStyles;
