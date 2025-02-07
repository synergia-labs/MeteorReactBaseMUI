import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper, { PaperProps } from '@mui/material/Paper';
import { sysSizing } from '../../../ui/materialui/styles';

interface IShowNotificationStyles {
	Container: React.ElementType;
	Header: React.ElementType;
	Body: React.ElementType;
}

interface IContainer extends PaperProps {
	type: 'success' | 'error' | 'warning' | 'default';
}

const ShowNotificationStyles: IShowNotificationStyles = {
	Container: styled(Paper, {
		shouldForwardProp: (prop) => prop !== 'type'
	})<IContainer>(({ theme, type }) => ({
		minWidth: '440px',
		minHeight: '80px',
		borderRadius: sysSizing.radiusSm,
		display: 'flex',
		flexDirection: 'column',
		overflow: 'hidden',

		'& .MuiSvgIcon-root': {
			width: '24px',
			height: '24px'
		},

		...(type === 'success' && {
			backgroundColor: theme.palette.success.main,
			color: theme.palette.success.contrastText,
			border: `1px solid ${theme.palette.success.main}`,
			'& .MuiSvgIcon-root': {
				color: theme.palette.success.main
			}
		}),
		...(type === 'error' && {
			backgroundColor: theme.palette.error.main,
			color: theme.palette.error.contrastText,
			border: `1px solid ${theme.palette.error.main}`,
			'& .MuiSvgIcon-root': {
				color: theme.palette.error.main
			}
		}),
		...(type === 'warning' && {
			backgroundColor: theme.palette.warning.main,
			color: theme.palette.warning.contrastText,
			border: `1px solid ${theme.palette.warning.main}`,
			'& .MuiSvgIcon-root': {
				color: theme.palette.warning.dark
			}
		}),
		...(type === 'default' && {
			backgroundColor: theme.palette.sysAction?.primary,
			color: theme.palette.sysText?.base,
			border: `1px solid ${theme.palette.sysAction?.primary}`,
			'& .MuiSvgIcon-root': {
				color: theme.palette.sysAction?.primary
			}
		})
	})),
	Header: styled(Box)(() => ({
		padding: `${sysSizing.spacingFixedXs} ${sysSizing.spacingFixedSm}`
	})),
	Body: styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: `${sysSizing.spacingFixedXs} ${sysSizing.spacingFixedSm}`,
		backgroundColor: theme.palette.background.default,
		flexGrow: 1,
		flexShrink: 0,
		gap: theme.spacing(1)
	}))
};


export default ShowNotificationStyles;
