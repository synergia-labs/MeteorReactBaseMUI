import React, { ReactElement, ReactNode } from 'react';
import SysLabelViewStyles from './sysLabelViewStyle';
import { SxProps, Theme, Tooltip, TooltipProps, Typography } from '@mui/material';

interface ISysLabelView extends Omit<TooltipProps, 'children' | 'title' | 'placement'> {
	label?: string;
	tooltipMessage?: string;
	disabled?: boolean;
	sxMap?: {
		container?: SxProps<Theme>;
		header?: SxProps<Theme>;
		helpIcon?: SxProps<Theme>;
	};
	children?: ReactNode | ReactElement;
	placement: string | undefined;
	helpIcon?: boolean;
	readOnly?: boolean;
}

const SysLabelView: React.FC<ISysLabelView> = ({
	label,
	tooltipMessage,
	sxMap,
	disabled,
	children,
	placement,
	helpIcon,
	readOnly
}) => {
	return (
		<SysLabelViewStyles.container sx={sxMap?.container}>
			{(!!label || !!tooltipMessage) && (
				<Tooltip title={tooltipMessage} placement={placement as any}>
					<SysLabelViewStyles.header sx={sxMap?.header}>
						<Typography
							variant="body2"
							color={(theme) => (disabled ? theme.palette.sysText?.disabled : theme.palette.sysText?.auxiliary)}>
							{label}
						</Typography>
						{helpIcon && <SysLabelViewStyles.helpIcon disabled={disabled} />}
					</SysLabelViewStyles.header>
				</Tooltip>
			)}
			{children}
		</SysLabelViewStyles.container>
	);
};

export default SysLabelView;
