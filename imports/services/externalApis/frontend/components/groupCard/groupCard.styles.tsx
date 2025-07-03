import { Box, BoxProps, Paper, PaperProps, styled } from "@mui/material";
import React, { ElementType } from "react";

interface IStyles {
	container: ElementType<PaperProps>;
	groupIconContainer: ElementType<BoxProps>;
}

const GroupCardStyles: IStyles = {
	container: styled(Paper)(({ theme }) => ({
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: theme.spacing(2)
	})),
	groupIconContainer: styled(Box)(({ theme }) => ({
		display: "flex",
		gap: theme.spacing(1),
		justifyContent: "center",
		alignItems: "center"
	}))
};

export default GroupCardStyles;
