import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import Avatar, { AvatarProps } from "@mui/material/Avatar";
import { sysSizes } from "../../theme/sizes";

interface IContainer extends BoxProps {
	cursorPointer?: boolean;
	size: "small" | "medium" | "large";
	activateOutline: boolean;
}
interface ISysAvatarStyles {
	container: ElementType<IContainer>;
	avatar: ElementType<AvatarProps>;
}

const SysAvatarStyles: ISysAvatarStyles = {
	container: styled(Box, {
		shouldForwardProp: (prop) => prop !== "cursorPointer" && prop !== "size" && prop !== "activateOutline"
	})<IContainer>(({ theme, cursorPointer, size, activateOutline }) => ({
		"width":
			size === "small"
				? sysSizes.components.buttonSmallMinHeight
				: size === "medium"
					? sysSizes.spacingRem.xl
					: sysSizes.components.buttonMediumMinHeight,
		"height":
			size === "small"
				? sysSizes.components.buttonSmallMinHeight
				: size === "medium"
					? sysSizes.spacingRem.xl
					: sysSizes.components.buttonMediumMinHeight,
		"borderRadius": "50%",
		"border": !activateOutline ? "none" : `2px solid ${theme?.palette.common.white}`,
		"display": "flex",
		"overflow": "hidden",
		"alignItems": "center",
		"justifyContent": "center",
		"padding": !activateOutline ? "none" : sysSizes.spacingFixed.xs,
		"cursor": cursorPointer ? "pointer" : "inherit",
		"flexShrink": 0,
		"minWidth": activateOutline ? sysSizes.components.buttonMediumMinHeight : "auto",
		"minHeight": activateOutline ? sysSizes.components.buttonMediumMinHeight : "auto",
		"& .MuiAvatar-root": {
			margin: 0
		}
	})),
	avatar: styled(Avatar)(({ theme }) => ({
		"width": "100%",
		"height": "100%",
		"backgroundColor": theme?.palette.primary.dark,
		"flexShrink": 0,
		"marigin": 0,
		"&:focus": {
			backgroundColor: theme?.palette.sysAction?.primaryContrastText,
			color: theme?.palette.sysAction?.primaryHover,
			outline: "none"
		}
	}))
};

export default SysAvatarStyles;
