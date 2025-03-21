import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";
import { sysSizing } from "/imports/ui/materialui/styles";

interface IStyles {
	container: ElementType<BoxProps>;
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
	})
};

export default userDetailStyles;
