import React, { ReactElement, ReactNode } from "react";
import SysLabelViewStyles from "./sysLabelViewStyle";
import { FormHelperText, SxProps, Theme } from "@mui/material";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SysIcon from "../sysIcon/sysIcon";

interface ISysLabelView extends Omit<TooltipProps, "children" | "title" | "placement"> {
	label?: string;
	showLabelAdornment?: boolean;
	labelAdornment?: string;
	disabled?: boolean;
	children?: ReactNode | ReactElement;
	showTooltip?: boolean;
	tooltipMessage?: string;
	tooltipPosition?: string | undefined;
	helperText?: string;
	sxMap?: {
		container?: SxProps<Theme>;
		header?: SxProps<Theme>;
		helpIcon?: SxProps<Theme>;
	};
}

const { Container, Header, ChildrenContainer } = SysLabelViewStyles;

const SysLabelView: React.FC<ISysLabelView> = ({
	label,
	showLabelAdornment,
	labelAdornment = "(opcional)",
	disabled,
	children,
	showTooltip,
	tooltipMessage,
	tooltipPosition,
	sxMap,
	helperText
}) => {
	const component = (
		<ChildrenContainer>
			{children}
			{helperText && <FormHelperText>{helperText}</FormHelperText>}
		</ChildrenContainer>
	);

	return !!label || showTooltip ? (
		<Container sx={sxMap?.container}>
			<Tooltip title={tooltipMessage} placement={tooltipPosition as any}>
				<Header sx={sxMap?.header}>
					<Typography
						variant="body2"
						color={(theme) => (disabled ? theme.palette.sysText?.disabled : theme.palette.sysText?.auxiliary)}>
						{label} {showLabelAdornment && labelAdornment}
					</Typography>
					{showTooltip && (
						<SysIcon
							name={"help"}
							sx={{
								color: (theme) => (disabled ? theme.palette.sysText?.disabled : theme.palette.sysText?.auxiliary)
							}}
						/>
					)}
				</Header>
			</Tooltip>
			{component}
		</Container>
	) : (
		component
	);
};

export default SysLabelView;
