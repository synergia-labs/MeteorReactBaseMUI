import React, { ElementType } from "react";
import styled from "@mui/material/styles/styled";
import Box, { BoxProps } from "@mui/material/Box";

interface IStyles {
	contaienr: ElementType<BoxProps>;
	textContainer: ElementType<BoxProps>;
}

const translateItemStyles: IStyles = {
	contaienr: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing(2),
		paddingLeft: theme.spacing(1)
	})),
	textContainer: styled(Box)(({ theme }) => ({
		display: "flex",
		flexDirection: "column",
		gap: theme.spacing(1)
	}))
};

export default translateItemStyles;
