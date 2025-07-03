import { Box, BoxProps, styled } from "@mui/material";
import React, { ElementType } from "react";

interface IStyles {
	container: ElementType<BoxProps>;
	textFieldContainer: ElementType<BoxProps>;
}

const TranslateModalStyles: IStyles = {
	container: styled(Box)(({ theme }) => ({
		width: "min(100vw, 700px)",
		height: "min(100vh, 300px)",
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "stretch",
		gap: theme.spacing(4)
	})),
	textFieldContainer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		gap: theme.spacing(1),
		width: "100%"
	}))
};

export default TranslateModalStyles;
