import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

interface IStyles {
	container: ElementType<IContainer>;
}

interface IContainer extends BoxProps {
	disabled?: boolean;
}

const SysMenuItemDefaultStyles: IStyles = {
	container: styled(Box, {
		shouldForwardProp: (prop) => prop !== "disabled"
	})<IContainer>(({ theme, disabled }) => ({
		display: "flex",
		alignItems: "center",
		gap: theme.spacing(1),
		transition: "all 0.3s ease",
		padding: theme.spacing(1),
		borderRadius: theme.shape.borderRadius * 4,
		opacity: disabled ? 0.5 : 1,
		cursor: disabled ? "not-allowed" : "pointer",
		["& .MuiSvgIcon-root"]: {
			width: "24px",
			height: "24px",
			color: theme.palette.sysAction?.primary
		},
		["&:hover"]: {
			backgroundColor: !disabled && theme.palette.sysAction?.primaryBgHover
		}
	}))
};

export default SysMenuItemDefaultStyles;
