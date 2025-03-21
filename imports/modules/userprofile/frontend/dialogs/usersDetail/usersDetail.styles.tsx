import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { sysSizing } from "/imports/ui/materialui/styles";

interface IStyles {
	container: ElementType<BoxProps>;
	footer: ElementType<BoxProps>;
}

const userDetailStyles: IStyles = {
	container: styled(Box)({
		padding: sysSizing.spacingFixedLg,
		gap: sysSizing.spacingFixedMd,
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
		width: "540px",
		maxHeight: "100%",
		maxWidth: "100%"
	}),
	footer: styled(Box)({
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		gap: sysSizing.spacingFixedMd
	})
};

export default userDetailStyles;
