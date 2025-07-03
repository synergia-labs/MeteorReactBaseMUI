import React, { ElementType } from "react";
import styled from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";
import { TypographyProps } from "@mui/material/Typography";
import SysTooltipTypography from "../../sysTooltipTypography/sysTooltipTypography";
interface IText extends Omit<TypographyProps, "ref"> {
	disabled?: boolean;
}

interface IStyles {
	container: ElementType<BoxProps>;
	textContainer: ElementType<BoxProps>;
	title: ElementType<IText>;
	description: ElementType<IText>;
}

const SysDetailedSwitchStyles: IStyles = {
	container: styled(Box)(({ theme }) => ({
		width: "100%",
		display: "flex",
		flexDirection: "row",
		alignItems: "start",
		justifyContent: "space-between",
		gap: theme.spacing(7)
	})),
	textContainer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		gap: theme.spacing(0.5)
	})),
	title: styled(SysTooltipTypography)<IText>(({ theme, disabled }) => ({
		color: theme.palette.sysText.body,
		opacity: !!disabled ? 0.5 : 1
	})),
	description: styled(SysTooltipTypography)<IText>(({ theme, disabled }) => ({
		color: theme.palette.sysText.body,
		opacity: !!disabled ? 0.5 : 1
	}))
};

export default SysDetailedSwitchStyles;
