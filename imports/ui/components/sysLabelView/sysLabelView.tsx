import React, { ReactElement, ReactNode } from 'react';
import SysLabelViewStyles from './sysLabelViewStyle';
import { SxProps, Theme, Tooltip, TooltipProps, Typography } from '@mui/material';

interface ISysLabelView extends Omit<TooltipProps, 'children' | 'title'> {
	label?: string;
	tooltipMessage?: string;
	disabled?: boolean;
	sxMap?: {
		container?: SxProps<Theme>;
		header?: SxProps<Theme>;
	};
	children?: ReactNode | ReactElement;
}

const SysLabelView: React.FC<ISysLabelView> = ({ label, tooltipMessage, sxMap, disabled, children }) => {
	return (
		<SysLabelViewStyles.container sx={sxMap?.container}>
			{(!!label || !!tooltipMessage) && (
				<SysLabelViewStyles.header sx={sxMap?.header}>
					<Tooltip title={tooltipMessage}>
						<Typography
							variant="body2"
							color={(theme) => (disabled ? theme.palette.sysText?.disabled : theme.palette.sysText?.auxiliary)}>
							{label}
						</Typography>
					</Tooltip>
				</SysLabelViewStyles.header>
			)}
			{children}
		</SysLabelViewStyles.container>
	);
};

export default SysLabelView;
