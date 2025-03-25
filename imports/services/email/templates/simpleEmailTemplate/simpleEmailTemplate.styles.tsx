import React, { ElementType } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

interface IStyles {
	wrapper: ElementType<BoxProps>;
	container: ElementType<BoxProps>;
	body: ElementType<BoxProps>;
}

const SimpleEmailTemplateStyles: IStyles = {
	wrapper: styled(Box)(({ theme }) => ({
		backgroundColor: theme.palette.sysBackground?.bg2,
		width: "100%",
		minHeight: "500px",
		padding: theme.spacing(1),
		paddingTop: theme.spacing(5)
	})),
	container: styled(Box)(({ theme }) => ({
		margin: "auto",
		padding: theme.spacing(2),
		maxWidth: "800px",
		backgroundColor: theme.palette.common.white,
		borderRadius: theme.shape.borderRadius * 2,
		border: `1px solid ${theme.palette.divider}`
	})),
	body: styled(Box)(({ theme }) => ({
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	}))
};

export default SimpleEmailTemplateStyles;
