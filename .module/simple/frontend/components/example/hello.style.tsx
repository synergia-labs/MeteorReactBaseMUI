import React from "react";
import styled from "@mui/material/styles/styled";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import { sysSizes } from "/imports/theme/sizes";

interface IStyleProps {
	container: React.ElementType<BoxProps>;
	text: React.ElementType<TypographyProps>;
	moduleNameText: React.ElementType<TypographyProps>;
}

const Style: IStyleProps = {
	container: styled(Box)({
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		gap: sysSizes.base.rem
	}),
	text: styled(Typography)({
		fontSize: "2rem"
	}),
	moduleNameText: styled(Typography)({
		fontSize: "1rem",
		marginTop: "1rem"
	})
};

export default Style;
