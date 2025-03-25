import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { getSysSizes } from "../../../../../theme/sizes";

interface IStyles {
	container: ElementType<BoxProps>;
	footer: ElementType<BoxProps>;
}

const userDetailStyles: IStyles = {
	container: styled(Box)(({ theme }) => ({
		padding: getSysSizes(theme).spacingFixed.lg,
		gap: getSysSizes(theme).spacingFixed.md,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		width: "540px",
		maxHeight: "100%",
		maxWidth: "100%"
	})),
	footer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		gap: getSysSizes(theme).spacingFixed.md
	}))
};

export default userDetailStyles;
