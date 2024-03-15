import React from 'react';
import Typography from '@mui/material/Typography';
import LoadingStyle from './sysLoadingStyle';
import { SxProps, Theme } from '@mui/material';

interface ISysLoading {
	label?: string;
	size?: 'small' | 'medium' | 'large';
	sxMap?: {
		container?: SxProps<Theme>;
		loading?: SxProps<Theme>;
	} 
}

export const SysLoading : React.FC<ISysLoading> = ({ 
	label,
	size = 'medium',
	sxMap 
}) => {
	return (
		<LoadingStyle.container sx={sxMap?.container}>
			<LoadingStyle.loading sx={sxMap?.loading} size={size}/>
			{label && <Typography variant="caption" color={(theme) => theme.palette.sysText?.primary}>
				{label}
			</Typography>}
		</LoadingStyle.container>
	);
};
