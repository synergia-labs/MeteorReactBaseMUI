import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { LoadingStyle } from './LoadingStyle';

export const Loading = ({ sx = {}, label = '' }) => {
	return (
		<Box
			sx={{
				...LoadingStyle.boxContainer,
				...sx
			}}>
			<LoadingStyle.loading />
			<Typography variant="caption" color={(theme) => theme.palette.sysText?.primary}>
				{label}
			</Typography>
		</Box>
	);
};
