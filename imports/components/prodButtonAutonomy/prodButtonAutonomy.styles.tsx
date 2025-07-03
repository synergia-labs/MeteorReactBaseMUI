import React, { ElementType } from "react";
import { Box, BoxProps, ButtonBase, ButtonBaseProps, styled } from "@mui/material";
import { sysSizes } from "/imports/theme/sizes";
import { enumAutonomy } from "/imports/enums/autonomy";
import getAutonomyColor from "/imports/libs/autonomy/getAutonomyColor";

interface IContainer extends ButtonBaseProps {
	autonomy: enumAutonomy;
}

interface IAlertCountContainer extends BoxProps {
	autonomy: enumAutonomy;
}

interface IStyles {
	container: ElementType<IContainer>;
	alertCountContainer: ElementType<IAlertCountContainer>;
}

export default {
	container: styled(ButtonBase)<IContainer>(({ theme, autonomy, disabled }) => ({
		display: "flex",
		flexDirection: "row",
		gap: sysSizes.spacingFixed.sm,
		justifyContent: "center",
		alignItems: "center",
		padding: `${sysSizes.components.buttonMediumPy} ${sysSizes.components.buttonSmallPx}`,
		backgroundColor: getAutonomyColor(theme, autonomy).main,
		color: getAutonomyColor(theme, autonomy).contrastText,
		borderRadius: sysSizes.radius.sm,
		minWidth: "252px",
		transition: "all 0.2s ease-in-out",
		opacity: disabled ? 0.3 : 1,
		["&:hover"]: {
			backgroundColor: getAutonomyColor(theme, autonomy).dark
		}
	})),
	alertCountContainer: styled(Box)<IAlertCountContainer>(({ theme, autonomy }) => ({
		backgroundColor: getAutonomyColor(theme, autonomy).light,
		padding: sysSizes.spacingFixed.xs,
		borderRadius: sysSizes.radius.xs,
		height: "32px",
		minWidth: "32px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}))
} as IStyles;
