import React from 'react';
import { FabProps, Typography } from '@mui/material';
import { SysFabStyled } from './sysFabStyles';

interface ISysFabProps extends FabProps {
	fixed?: boolean;
	startIcon?: React.ReactNode;
	endIcon?: React.ReactNode;
	text?: string;
	children?: React.ReactNode;
}

export const SysFab: React.FC<ISysFabProps> = ({
	fixed = false,
	children,
	startIcon,
	endIcon,
	...props
}: ISysFabProps) => {
	return (
		<SysFabStyled {...props} fixed={fixed}>
			{children ?? (
				<>
					{startIcon}
					{!!props.text && (
						<Typography variant="button" sx={{ textTransform: 'none' }}>
							{props.text}
						</Typography>
					)}
					{endIcon}
				</>
			)}
		</SysFabStyled>
	);
};
