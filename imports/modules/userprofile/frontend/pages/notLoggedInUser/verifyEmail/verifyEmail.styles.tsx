import React, { ElementType } from "react";
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import { sysSizes } from "../../../../../../theme/sizes";

interface IStyles {
	container: ElementType<BoxProps>;
}

const VerifyEmailStyles: IStyles = {
	container: styled(Box)(({ theme }) => ({
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: sysSizes.spacingFixed.xl,
		minHeight: "300px",
		transition: "all 0.3s ease"
	}))
};

export default VerifyEmailStyles;
