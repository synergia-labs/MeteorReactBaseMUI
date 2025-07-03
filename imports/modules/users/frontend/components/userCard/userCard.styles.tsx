import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { sysSizes } from "../../../../../theme/sizes";

interface IStyles {
	container: ElementType<BoxProps>;
	line: ElementType<BoxProps>;
	wrapper: ElementType<BoxProps>;
}

const userCardStyles: IStyles = {
	wrapper: styled(Box)(({ theme }) => ({
		minWidth: "min(100%, 418px)",
		display: "flex",
		flexDirection: "column",
		gap: sysSizes.spacingFixed.sm,
		backgroundColor: theme.palette.sysBackground.bg3,
		borderRadius: sysSizes.radius.md,
		flexShrink: 0
	})),
	container: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		gap: sysSizes.spacingFixed.sm,
		backgroundColor: theme.palette.sysBackground.bg1,
		padding: sysSizes.spacingFixed.md,
		borderRadius: sysSizes.radius.sm,
		flexShrink: 0
	})),
	line: styled(Box)(({}) => ({
		display: "flex",
		alignItems: "center",
		gap: sysSizes.spacingFixed.sm
	}))
};

export default userCardStyles;
