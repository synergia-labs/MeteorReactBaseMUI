import React from "react";
import styled from "@mui/material/styles/styled";
import { Typography, IconOwnProps, BoxProps, ButtonBase } from "@mui/material";
import SysIcon from "../sysIcon/sysIcon";
import { sysSizes } from "/imports/theme/sizes";

interface IIconProps extends IconOwnProps {
	name: string;
}
interface IButtonProps extends BoxProps {
	variant?: "primary" | "secondary" | "disabled";
}

export default {
	container: styled(ButtonBase)<IButtonProps>(({ theme, variant, disabled }) => ({
		height: "22px",
		display: "flex",
		alignItems: "center",
		padding: `2px ${sysSizes.spacingFixed.sm}`,
		gap: sysSizes.spacingFixed.sm,
		borderRadius: sysSizes.radius.infinite,
		transition: "all 0.2s",

		...((disabled || variant == "disabled") && {
			backgroundColor: theme.palette.sysAction.primaryBgHover,
			color: theme.palette.sysText.disabled2
		}),

		...(variant == "primary" && {
			backgroundColor: theme.palette.sysAction.primaryHover,
			color: theme.palette.sysText.base,
			["&.MuiSvgIcon-root"]: {
				color: theme.palette.primary.contrastText
			},
			["&:hover"]: {
				backgroundColor: theme.palette.sysAction.primary
			}
		}),

		...(variant === "secondary" && {
			backgroundColor: theme.palette.sysAction.primaryBgHover,
			color: theme.palette.sysText.primary,
			["&.MuiSvgIcon-root"]: {
				color: theme.palette.sysAction.primaryIcon
			},
			["&:hover"]: {
				backgroundColor: theme.palette.sysAction.secondary
			}
		})
	})),
	label: styled(Typography)(() => ({})),
	icon: styled((props: IIconProps) => <SysIcon {...props} />)(() => ({
		width: sysSizes.components.iconSizeSmall,
		height: sysSizes.components.iconSizeSmall
	}))
};
