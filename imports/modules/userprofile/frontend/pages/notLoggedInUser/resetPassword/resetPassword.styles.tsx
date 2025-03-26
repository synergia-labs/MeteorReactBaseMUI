import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { sysSizes } from "../../../../../../theme/sizes";

interface IStyles {
	container: ElementType<BoxProps>;
	body: ElementType<BoxProps>;
	footer: ElementType<BoxProps>;
}

const resetPasswordStyle: IStyles = {
	container: styled(Box)(({ theme }) => ({
		gap: sysSizes.spacingFixed.xl,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%"
	})),
	body: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		gap: theme.spacing(2)
	})),
	footer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: sysSizes.spacingFixed.md,
		justifyContent: "space-between"
	}))
};

export default resetPasswordStyle;
