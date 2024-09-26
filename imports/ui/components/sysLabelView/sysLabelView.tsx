import React, { ReactElement, ReactNode } from 'react';
import SysLabelViewStyles from './sysLabelViewStyle';
import { SxProps, Theme } from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SysIcon from '../../../ui/components/sysIcon/sysIcon';

interface ISysLabelView extends Omit<TooltipProps, 'children' | 'title' | 'placement'> {
	label?: string;
	showLabelAdornment?: boolean;
	labelAdornment?: string;
	disabled?: boolean;
	children?: ReactNode | ReactElement;
	showTooltip?: boolean;
	tooltipMessage?: string;
	tooltipPosition?: string | undefined;
	sxMap?: {
		container?: SxProps<Theme>;
		header?: SxProps<Theme>;
		helpIcon?: SxProps<Theme>;
	};
}

const { Container, Header } = SysLabelViewStyles;

const SysLabelView: React.FC<ISysLabelView> = ({
	label,
	showLabelAdornment,
	labelAdornment = '(opcional)',
	disabled,
	children,
	showTooltip,
	tooltipMessage,
	tooltipPosition,
	sxMap
}) => {
	return (
		<Container sx={sxMap?.container}>
			{(!!label || showTooltip) && (
				<Tooltip title={tooltipMessage} placement={tooltipPosition as any}>
					<Header sx={sxMap?.header}>
						<Typography
							variant="body2"
							color={(theme) => (disabled ? theme.palette.sysText?.disabled : theme.palette.sysText?.auxiliary)}>
							{label} {showLabelAdornment && labelAdornment}
						</Typography>
						{showTooltip && <SysIcon name={'help'} color={disabled ? 'disabled' : 'inherit'} />}
					</Header>
				</Tooltip>
			)}
			{children}
		</Container>
	);
};

export default SysLabelView;
