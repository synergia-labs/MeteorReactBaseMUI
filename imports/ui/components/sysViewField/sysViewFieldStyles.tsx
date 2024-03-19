import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { sysSizing } from '../../materialui/styles';

interface IInfo {
	type: 'label' | 'placeholder';
	disabled: boolean;
}

export const SysViewFieldStyle = {
	container: styled(Box)(({}) => ({
		display: 'flex',
		flexDirection: 'column',
		gap: sysSizing.spacingFixedXs
	})),

	info: styled(Typography)<IInfo>(({ theme, type, disabled }) => ({
		display: 'flex',
		alignItems: 'center',
		height: type === 'label' ? '21px' : '25px',
		color: disabled
			? theme.palette.sysText?.disabled
			: type == 'label'
				? theme.palette.sysText?.auxiliary
				: theme.palette.sysText?.body
	}))
};
