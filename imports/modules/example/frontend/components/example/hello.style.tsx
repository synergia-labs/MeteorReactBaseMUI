import React from "react";
import styled from "@mui/material/styles/styled";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";

interface IStyleProps {
	container: React.ElementType<BoxProps>;
	text: React.ElementType<TypographyProps>;
}

const Style: IStyleProps = {
	container: styled(Box)({
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%"
	}),
	text: styled(Typography)({
		fontSize: "2rem"
	})
};

export default Style;
