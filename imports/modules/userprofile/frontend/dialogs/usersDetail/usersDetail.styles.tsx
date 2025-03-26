import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { sysSizes } from "../../../../../theme/sizes";

interface IStyles {
	container: ElementType<BoxProps>;
	footer: ElementType<BoxProps>;
}

const userDetailStyles: IStyles = {
	container: styled(Box)(() => ({
		padding: sysSizes.spacingFixed.lg,
		gap: sysSizes.spacingFixed.md,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		width: "540px",
		maxHeight: "100%",
		maxWidth: "100%"
	})),
	footer: styled(Box)(() => ({
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		gap: sysSizes.spacingFixed.md
	}))
};

export default userDetailStyles;
