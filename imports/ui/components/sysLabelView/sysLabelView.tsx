import React, { ReactElement, ReactNode } from 'react';
import SysLabelViewStyles from './sysLabelViewStyle';
import { SxProps, Theme } from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SysIcon from '/imports/ui/components/SysIcon/sysIcon';

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
	placement?: string | undefined;
	readOnly?: boolean;
	showRequired?: boolean;
	requiredIndicator?: string;
}

const {
  Container,
  Header,
} = SysLabelViewStyles;

const SysLabelView: React.FC<ISysLabelView> = ({
	label,
	tooltipMessage,
	sxMap,
	disabled,
	children,
	placement,
	showRequired,
	requiredIndicator = '*'
}) => {
	return (
		<Container sx={sxMap?.container}>
			{(!!label || !!tooltipMessage) && (
				<Tooltip title={tooltipMessage} placement={placement as any}>
					<Header sx={sxMap?.header}>
						<Typography
							variant="body2"
							color={(theme) => (disabled ? theme.palette.sysText?.disabled : theme.palette.sysText?.auxiliary)}>
							{label} {showRequired && requiredIndicator}
						</Typography>
						{!!tooltipMessage && <SysIcon name={'help'} color={disabled ? 'disabled' : 'inherit'} />}
          </Header>
				</Tooltip>
			)}
			{children}
		</Container>
	);
};

export default SysLabelView;
