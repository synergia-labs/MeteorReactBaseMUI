import React, { ElementType } from "react";
import { Box, BoxProps, styled } from "@mui/material";
import { enumAutonomy } from "/imports/enums/autonomy";
import { enumAlertPriority } from "/imports/modules/alerts/common/enums/alertPriority";
import getAutonomyColor from "/imports/libs/autonomy/getAutonomyColor";
import getAlertPriorityColor from "/imports/modules/alerts/common/utils/getAlertPriorityColor";
import { sysSizes } from "/imports/theme/sizes";

interface IContainer extends BoxProps {
	variant: enumAutonomy | enumAlertPriority | "default";
	isAutonomy: boolean;
	disabled?: boolean;
}

interface IStyles {
	container: ElementType<IContainer>;
}

export default {
	container: styled(Box, {
		shouldForwardProp: (prop) => prop !== "variant" && prop !== "isAutonomy" && prop !== "disabled"
	})<IContainer>(({ variant, theme, isAutonomy, disabled }) => {
		let color: any = isAutonomy
			? getAutonomyColor(theme, variant as enumAutonomy)
			: getAlertPriorityColor(theme, variant as enumAlertPriority);

		if (variant == "default")
			color = {
				main: theme.palette.sysBackground.bg1,
				contrastText: theme.palette.sysText.body,
				hover: theme.palette.sysAction.disabled
			};

		return {
			backgroundColor: disabled ? (color as any)?.hover : color.main,
			color: color.contrastText,
			border: variant == "default" ? `1px solid ${theme.palette.divider}` : "none",
			padding: `2px ${sysSizes.spacingFixed.md}`,
			borderRadius: isAutonomy ? sysSizes.radius.xs : sysSizes.radius.infinite
		};
	})
} as IStyles;
