import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { sysSizing } from '/imports/ui/materialui/styles';

interface IShowNotificationStyles {
	container: React.ElementType;
	header: React.ElementType;
	body: React.ElementType;
}

const ShowNotificationStyles: IShowNotificationStyles = {
	container: styled(Paper)<IContainer>(({ theme, type }) => ({
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
	header: styled(Box)(() => ({
		padding: `${sysSizing.spacingFixedXs} ${sysSizing.spacingFixedSm}`
	})),
	body: styled(Box)(({ theme }) => ({
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

interface IContainer {
	type: 'success' | 'error' | 'warning' | 'default';
}

export default ShowNotificationStyles;
