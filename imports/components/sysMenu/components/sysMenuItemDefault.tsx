import React, { ReactNode } from "react";
import { ISysMenuItem } from "../sysMenuProvider";
import Styles from "./sysMenuItemDefaultStyles";
import { Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface ISysMenuItemDefault extends ISysMenuItem {
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	label?: ReactNode;
	sx?: SxProps<Theme>;
	disabled?: boolean;
}

const SysMenuItemDefault: React.FC<ISysMenuItemDefault> = ({ startIcon, endIcon, label, onClick, sx, disabled }) => {
	return (
		<Styles.container onClick={disabled ? undefined : onClick} sx={sx} disabled={disabled}>
			{startIcon && startIcon}
			<Typography variant="body1">{label}</Typography>
			{endIcon && endIcon}
		</Styles.container>
	);
};

export default SysMenuItemDefault;
