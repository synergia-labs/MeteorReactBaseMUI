import React, { ElementType } from "react";
import { Box, BoxProps, styled } from "@mui/material";

interface IStyles {
	container: ElementType<BoxProps>;
	slider: ElementType<BoxProps>;
}

export default {
	container: styled(Box)({
		position: "relative"
	}),
	slider: styled(Box)({
		transition: "height 0.3s",
		minHeight: "auto !important",
		overflow: "visible !important",
		overflowX: "clip !important"
	})
} as IStyles;
